import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { loadDb, saveDb } from '../common/store';
import { notifyTelegram } from '../common/telegram';

@Injectable()
export class OrdersService {
  findAll() {
    return [...loadDb().orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  findOne(id: string) {
    const order = loadDb().orders.find((o) => o.id === id);
    if (!order) throw new NotFoundException(`Заказ ${id} не найден`);
    return order;
  }

  findByKitchen(kitchenId: string) {
    return loadDb()
      .orders.filter((o) => o.kitchenId === kitchenId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async create(data: any) {
    const db = loadDb();
    const kitchen = db.kitchens.find((k) => k.id === data.kitchenId);
    const subtotal = (data.items || []).reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0,
    );
    const minOrder = kitchen?.minOrder ?? 30000;
    if (subtotal < minOrder) {
      throw new BadRequestException(`Минимальная сумма заказа: ${minOrder} сум`);
    }

    const deliveryFee = data.deliveryFee ?? 15000;
    let discount = 0;
    const promo = String(data.promoCode || '').trim().toUpperCase();
    if (promo === 'HOMEFOOD10') {
      discount = Math.round(subtotal * 0.1);
    }

    const totalAmount = subtotal + deliveryFee - discount;
    const commissionRate = kitchen?.commissionRate ?? 18;
    const platformFee = Math.round((subtotal - discount) * (commissionRate / 100));

    const order = {
      id: randomUUID(),
      orderNumber: `TSH-${String(db.orderCounter++).padStart(4, '0')}`,
      kitchenId: data.kitchenId,
      kitchenName: data.kitchenName,
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      items: data.items || [],
      subtotal,
      deliveryFee,
      discount,
      promoCode: promo || null,
      totalAmount,
      commissionRate,
      platformFee,
      kitchenPayout: subtotal - discount - platformFee,
      status: 'pending',
      paymentStatus: 'unpaid',
      paymentMethod: null as string | null,
      deliveryAddress: data.deliveryAddress || '',
      timeSlot: data.timeSlot || '',
      comment: data.comment || '',
      nutrition: data.nutrition || null,
      createdAt: new Date().toISOString(),
    };

    db.orders.push(order);
    saveDb(db);

    const lines = (order.items || [])
      .map((i: any) => `• ${i.name} × ${i.quantity}`)
      .join('\n');
    const msg =
      `🍽 <b>Новый заказ ${order.orderNumber}</b>\n` +
      `Кухня: ${order.kitchenName}\n` +
      `Клиент: ${order.clientName} ${order.clientPhone}\n` +
      `Адрес: ${order.deliveryAddress || '—'}\n` +
      `Время: ${order.timeSlot || 'asap'}\n` +
      `${lines}\n` +
      `Итого: ${order.totalAmount} сум`;
    await notifyTelegram(msg, kitchen?.telegramChatId);

    return order;
  }

  async updateStatus(id: string, status: string) {
    const db = loadDb();
    const idx = db.orders.findIndex((o) => o.id === id);
    if (idx === -1) throw new NotFoundException(`Заказ ${id} не найден`);
    db.orders[idx].status = status;
    db.orders[idx].updatedAt = new Date().toISOString();
    saveDb(db);
    const o = db.orders[idx];
    await notifyTelegram(
      `📦 Заказ <b>${o.orderNumber}</b>: статус → <b>${status}</b>`,
      db.kitchens.find((k) => k.id === o.kitchenId)?.telegramChatId,
    );
    return o;
  }

  pay(id: string, method?: string) {
    const db = loadDb();
    const idx = db.orders.findIndex((o) => o.id === id);
    if (idx === -1) throw new NotFoundException(`Заказ ${id} не найден`);
    const allowed = ['click', 'payme', 'cash'];
    const m = String(method || 'click').toLowerCase();
    if (!allowed.includes(m)) {
      throw new BadRequestException('Способ оплаты: click, payme или cash');
    }
    db.orders[idx].paymentStatus = 'paid';
    db.orders[idx].paymentMethod = m;
    db.orders[idx].paidAt = new Date().toISOString();
    saveDb(db);
    return db.orders[idx];
  }
}

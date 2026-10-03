"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const store_1 = require("../common/store");
const telegram_1 = require("../common/telegram");
let OrdersService = class OrdersService {
    findAll() {
        return [...(0, store_1.loadDb)().orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    findOne(id) {
        const order = (0, store_1.loadDb)().orders.find((o) => o.id === id);
        if (!order)
            throw new common_1.NotFoundException(`Заказ ${id} не найден`);
        return order;
    }
    findByKitchen(kitchenId) {
        return (0, store_1.loadDb)()
            .orders.filter((o) => o.kitchenId === kitchenId)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    async create(data) {
        const db = (0, store_1.loadDb)();
        const kitchen = db.kitchens.find((k) => k.id === data.kitchenId);
        const subtotal = (data.items || []).reduce((sum, item) => sum + item.price * item.quantity, 0);
        const minOrder = kitchen?.minOrder ?? 30000;
        if (subtotal < minOrder) {
            throw new common_1.BadRequestException(`Минимальная сумма заказа: ${minOrder} сум`);
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
            id: (0, crypto_1.randomUUID)(),
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
            paymentMethod: null,
            deliveryAddress: data.deliveryAddress || '',
            timeSlot: data.timeSlot || '',
            comment: data.comment || '',
            nutrition: data.nutrition || null,
            createdAt: new Date().toISOString(),
        };
        db.orders.push(order);
        (0, store_1.saveDb)(db);
        const lines = (order.items || [])
            .map((i) => `• ${i.name} × ${i.quantity}`)
            .join('\n');
        const msg = `🍽 <b>Новый заказ ${order.orderNumber}</b>\n` +
            `Кухня: ${order.kitchenName}\n` +
            `Клиент: ${order.clientName} ${order.clientPhone}\n` +
            `Адрес: ${order.deliveryAddress || '—'}\n` +
            `Время: ${order.timeSlot || 'asap'}\n` +
            `${lines}\n` +
            `Итого: ${order.totalAmount} сум`;
        await (0, telegram_1.notifyTelegram)(msg, kitchen?.telegramChatId);
        return order;
    }
    async updateStatus(id, status) {
        const db = (0, store_1.loadDb)();
        const idx = db.orders.findIndex((o) => o.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException(`Заказ ${id} не найден`);
        db.orders[idx].status = status;
        db.orders[idx].updatedAt = new Date().toISOString();
        (0, store_1.saveDb)(db);
        const o = db.orders[idx];
        await (0, telegram_1.notifyTelegram)(`📦 Заказ <b>${o.orderNumber}</b>: статус → <b>${status}</b>`, db.kitchens.find((k) => k.id === o.kitchenId)?.telegramChatId);
        return o;
    }
    pay(id, method) {
        const db = (0, store_1.loadDb)();
        const idx = db.orders.findIndex((o) => o.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException(`Заказ ${id} не найден`);
        const allowed = ['click', 'payme', 'cash'];
        const m = String(method || 'click').toLowerCase();
        if (!allowed.includes(m)) {
            throw new common_1.BadRequestException('Способ оплаты: click, payme или cash');
        }
        db.orders[idx].paymentStatus = 'paid';
        db.orders[idx].paymentMethod = m;
        db.orders[idx].paidAt = new Date().toISOString();
        (0, store_1.saveDb)(db);
        return db.orders[idx];
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)()
], OrdersService);
//# sourceMappingURL=orders.service.js.map
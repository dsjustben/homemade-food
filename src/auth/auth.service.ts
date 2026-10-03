import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { loadDb, saveDb } from '../common/store';

@Injectable()
export class AuthService {
  register(data: { phone: string; name: string; role?: string }) {
    const db = loadDb();
    const phone = String(data.phone || '').trim();
    if (!phone) throw new ConflictException('Введите телефон');
    if (db.users.find((u) => u.phone === phone)) {
      throw new ConflictException('Этот номер уже зарегистрирован');
    }
    const user = {
      id: randomUUID(),
      phone,
      name: data.name || 'Клиент',
      role: data.role || 'client',
      address: '',
      card: '',
      notifications: true,
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
    saveDb(db);
    return user;
  }

  login(phone: string) {
    const user = loadDb().users.find((u) => u.phone === String(phone || '').trim());
    if (!user) throw new UnauthorizedException('Пользователь не найден');
    return user;
  }

  findAll() {
    return loadDb().users;
  }

  updateProfile(id: string, data: any) {
    const db = loadDb();
    const idx = db.users.findIndex((u) => u.id === id);
    if (idx === -1) throw new NotFoundException('Пользователь не найден');
    const allowed = ['name', 'address', 'card', 'notifications'];
    for (const key of allowed) {
      if (data[key] !== undefined) db.users[idx][key] = data[key];
    }
    saveDb(db);
    return db.users[idx];
  }
}

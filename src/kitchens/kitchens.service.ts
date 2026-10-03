import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { loadDb, saveDb } from '../common/store';

@Injectable()
export class KitchensService {
  findAll() {
    return loadDb().kitchens.filter((k) => k.status === 'active' || k.status === 'pending');
  }

  findOne(id: string) {
    const kitchen = loadDb().kitchens.find((k) => k.id === id);
    if (!kitchen) throw new NotFoundException(`Кухня ${id} не найдена`);
    return kitchen;
  }

  create(data: any) {
    const db = loadDb();
    const kitchen = {
      id: randomUUID(),
      name: data.name || 'Без названия',
      description: data.description || '',
      cuisineTypes: data.cuisineTypes || [],
      commissionRate: data.commissionRate ?? 18,
      status: 'pending',
      rating: 0,
      createdAt: new Date().toISOString(),
    };
    db.kitchens.push(kitchen);
    saveDb(db);
    return kitchen;
  }

  update(id: string, data: any) {
    const db = loadDb();
    const idx = db.kitchens.findIndex((k) => k.id === id);
    if (idx === -1) throw new NotFoundException(`Кухня ${id} не найдена`);
    db.kitchens[idx] = { ...db.kitchens[idx], ...data };
    saveDb(db);
    return db.kitchens[idx];
  }
}

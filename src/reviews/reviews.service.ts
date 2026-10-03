import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { loadDb, saveDb } from '../common/store';

@Injectable()
export class ReviewsService {
  findAll() {
    return loadDb().reviews || [];
  }

  findByKitchen(kitchenId: string) {
    return (loadDb().reviews || []).filter((r) => r.kitchenId === kitchenId);
  }

  create(data: { kitchenId: string; author: string; rating: number; text: string }) {
    const db = loadDb();
    if (!db.reviews) db.reviews = [];
    const review = {
      id: randomUUID(),
      kitchenId: data.kitchenId,
      author: data.author || 'Гость',
      rating: Math.min(5, Math.max(1, Number(data.rating) || 5)),
      text: data.text || '',
      createdAt: new Date().toISOString(),
    };
    db.reviews.unshift(review);
    saveDb(db);
    return review;
  }
}

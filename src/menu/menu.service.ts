import { Injectable, NotFoundException } from '@nestjs/common';
import { loadDb } from '../common/store';

@Injectable()
export class MenuService {
  findAll() {
    return loadDb().menu.filter((i) => i.isAvailable);
  }

  findPopular() {
    return loadDb().menu.filter((i) => i.isAvailable && i.popular);
  }

  findByKitchen(kitchenId: string) {
    return loadDb().menu.filter((i) => i.kitchenId === kitchenId && i.isAvailable);
  }

  findOne(id: string) {
    const item = loadDb().menu.find((i) => i.id === id);
    if (!item) throw new NotFoundException(`Блюдо ${id} не найдено`);
    return item;
  }
}

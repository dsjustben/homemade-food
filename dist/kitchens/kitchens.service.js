"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KitchensService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const store_1 = require("../common/store");
let KitchensService = class KitchensService {
    findAll() {
        return (0, store_1.loadDb)().kitchens.filter((k) => k.status === 'active' || k.status === 'pending');
    }
    findOne(id) {
        const kitchen = (0, store_1.loadDb)().kitchens.find((k) => k.id === id);
        if (!kitchen)
            throw new common_1.NotFoundException(`Кухня ${id} не найдена`);
        return kitchen;
    }
    create(data) {
        const db = (0, store_1.loadDb)();
        const kitchen = {
            id: (0, crypto_1.randomUUID)(),
            name: data.name || 'Без названия',
            description: data.description || '',
            cuisineTypes: data.cuisineTypes || [],
            commissionRate: data.commissionRate ?? 18,
            status: 'pending',
            rating: 0,
            createdAt: new Date().toISOString(),
        };
        db.kitchens.push(kitchen);
        (0, store_1.saveDb)(db);
        return kitchen;
    }
    update(id, data) {
        const db = (0, store_1.loadDb)();
        const idx = db.kitchens.findIndex((k) => k.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException(`Кухня ${id} не найдена`);
        db.kitchens[idx] = { ...db.kitchens[idx], ...data };
        (0, store_1.saveDb)(db);
        return db.kitchens[idx];
    }
};
exports.KitchensService = KitchensService;
exports.KitchensService = KitchensService = __decorate([
    (0, common_1.Injectable)()
], KitchensService);
//# sourceMappingURL=kitchens.service.js.map
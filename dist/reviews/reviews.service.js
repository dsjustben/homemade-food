"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const store_1 = require("../common/store");
let ReviewsService = class ReviewsService {
    findAll() {
        return (0, store_1.loadDb)().reviews || [];
    }
    findByKitchen(kitchenId) {
        return ((0, store_1.loadDb)().reviews || []).filter((r) => r.kitchenId === kitchenId);
    }
    create(data) {
        const db = (0, store_1.loadDb)();
        if (!db.reviews)
            db.reviews = [];
        const review = {
            id: (0, crypto_1.randomUUID)(),
            kitchenId: data.kitchenId,
            author: data.author || 'Гость',
            rating: Math.min(5, Math.max(1, Number(data.rating) || 5)),
            text: data.text || '',
            createdAt: new Date().toISOString(),
        };
        db.reviews.unshift(review);
        (0, store_1.saveDb)(db);
        return review;
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)()
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const store_1 = require("../common/store");
let MenuService = class MenuService {
    findAll() {
        return (0, store_1.loadDb)().menu.filter((i) => i.isAvailable);
    }
    findPopular() {
        return (0, store_1.loadDb)().menu.filter((i) => i.isAvailable && i.popular);
    }
    findByKitchen(kitchenId) {
        return (0, store_1.loadDb)().menu.filter((i) => i.kitchenId === kitchenId && i.isAvailable);
    }
    findOne(id) {
        const item = (0, store_1.loadDb)().menu.find((i) => i.id === id);
        if (!item)
            throw new common_1.NotFoundException(`Блюдо ${id} не найдено`);
        return item;
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)()
], MenuService);
//# sourceMappingURL=menu.service.js.map
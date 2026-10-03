"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const store_1 = require("../common/store");
let AuthService = class AuthService {
    register(data) {
        const db = (0, store_1.loadDb)();
        const phone = String(data.phone || '').trim();
        if (!phone)
            throw new common_1.ConflictException('Введите телефон');
        if (db.users.find((u) => u.phone === phone)) {
            throw new common_1.ConflictException('Этот номер уже зарегистрирован');
        }
        const user = {
            id: (0, crypto_1.randomUUID)(),
            phone,
            name: data.name || 'Клиент',
            role: data.role || 'client',
            address: '',
            card: '',
            notifications: true,
            createdAt: new Date().toISOString(),
        };
        db.users.push(user);
        (0, store_1.saveDb)(db);
        return user;
    }
    login(phone) {
        const user = (0, store_1.loadDb)().users.find((u) => u.phone === String(phone || '').trim());
        if (!user)
            throw new common_1.UnauthorizedException('Пользователь не найден');
        return user;
    }
    findAll() {
        return (0, store_1.loadDb)().users;
    }
    updateProfile(id, data) {
        const db = (0, store_1.loadDb)();
        const idx = db.users.findIndex((u) => u.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException('Пользователь не найден');
        const allowed = ['name', 'address', 'card', 'notifications'];
        for (const key of allowed) {
            if (data[key] !== undefined)
                db.users[idx][key] = data[key];
        }
        (0, store_1.saveDb)(db);
        return db.users[idx];
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map
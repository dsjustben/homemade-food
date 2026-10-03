"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnersController = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const store_1 = require("../common/store");
let PartnersController = class PartnersController {
    list() {
        return (0, store_1.loadDb)().partnerApplications || [];
    }
    apply(body) {
        const db = (0, store_1.loadDb)();
        if (!db.partnerApplications)
            db.partnerApplications = [];
        const app = {
            id: (0, crypto_1.randomUUID)(),
            name: body.name || '',
            phone: body.phone || '',
            kitchenName: body.kitchenName || '',
            city: body.city || 'Ташкент',
            comment: body.comment || '',
            status: 'new',
            createdAt: new Date().toISOString(),
        };
        db.partnerApplications.unshift(app);
        (0, store_1.saveDb)(db);
        return app;
    }
};
exports.PartnersController = PartnersController;
__decorate([
    (0, common_1.Get)('applications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PartnersController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('apply'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PartnersController.prototype, "apply", null);
exports.PartnersController = PartnersController = __decorate([
    (0, common_1.Controller)('partners')
], PartnersController);
//# sourceMappingURL=partners.controller.js.map
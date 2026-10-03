"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const health_controller_1 = require("./health/health.controller");
const kitchens_controller_1 = require("./kitchens/kitchens.controller");
const kitchens_service_1 = require("./kitchens/kitchens.service");
const menu_controller_1 = require("./menu/menu.controller");
const menu_service_1 = require("./menu/menu.service");
const orders_controller_1 = require("./orders/orders.controller");
const orders_service_1 = require("./orders/orders.service");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
const reviews_controller_1 = require("./reviews/reviews.controller");
const reviews_service_1 = require("./reviews/reviews.service");
const partners_controller_1 = require("./partners/partners.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [
            health_controller_1.HealthController,
            kitchens_controller_1.KitchensController,
            menu_controller_1.MenuController,
            orders_controller_1.OrdersController,
            auth_controller_1.AuthController,
            reviews_controller_1.ReviewsController,
            partners_controller_1.PartnersController,
        ],
        providers: [
            kitchens_service_1.KitchensService,
            menu_service_1.MenuService,
            orders_service_1.OrdersService,
            auth_service_1.AuthService,
            reviews_service_1.ReviewsService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
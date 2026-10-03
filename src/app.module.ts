import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { KitchensController } from './kitchens/kitchens.controller';
import { KitchensService } from './kitchens/kitchens.service';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsService } from './reviews/reviews.service';
import { PartnersController } from './partners/partners.controller';

@Module({
  imports: [],
  controllers: [
    HealthController,
    KitchensController,
    MenuController,
    OrdersController,
    AuthController,
    ReviewsController,
    PartnersController,
  ],
  providers: [
    KitchensService,
    MenuService,
    OrdersService,
    AuthService,
    ReviewsService,
  ],
})
export class AppModule {}

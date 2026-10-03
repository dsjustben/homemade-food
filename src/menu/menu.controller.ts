import { Controller, Get, Param } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get('popular')
  findPopular() {
    return this.menuService.findPopular();
  }

  @Get('kitchen/:kitchenId')
  findByKitchen(@Param('kitchenId') kitchenId: string) {
    return this.menuService.findByKitchen(kitchenId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }
}

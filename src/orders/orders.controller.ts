import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('kitchen/:kitchenId')
  findByKitchen(@Param('kitchenId') kitchenId: string) {
    return this.ordersService.findByKitchen(kitchenId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.ordersService.create(body);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.ordersService.updateStatus(id, body.status);
  }

  @Post(':id/pay')
  pay(@Param('id') id: string, @Body() body: { method?: string }) {
    return this.ordersService.pay(id, body?.method);
  }
}

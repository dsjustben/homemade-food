import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { KitchensService } from './kitchens.service';

@Controller('kitchens')
export class KitchensController {
  constructor(private readonly kitchensService: KitchensService) {}

  @Get()
  findAll() {
    return this.kitchensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kitchensService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.kitchensService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.kitchensService.update(id, body);
  }
}

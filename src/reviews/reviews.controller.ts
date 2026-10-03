import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get('kitchen/:kitchenId')
  findByKitchen(@Param('kitchenId') kitchenId: string) {
    return this.reviewsService.findByKitchen(kitchenId);
  }

  @Post()
  create(@Body() body: any) {
    return this.reviewsService.create(body);
  }
}

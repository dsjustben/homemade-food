import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    findAll(): any[];
    findByKitchen(kitchenId: string): any[];
    create(body: any): {
        id: `${string}-${string}-${string}-${string}-${string}`;
        kitchenId: string;
        author: string;
        rating: number;
        text: string;
        createdAt: string;
    };
}

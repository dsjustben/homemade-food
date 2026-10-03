export declare class ReviewsService {
    findAll(): any[];
    findByKitchen(kitchenId: string): any[];
    create(data: {
        kitchenId: string;
        author: string;
        rating: number;
        text: string;
    }): {
        id: `${string}-${string}-${string}-${string}-${string}`;
        kitchenId: string;
        author: string;
        rating: number;
        text: string;
        createdAt: string;
    };
}

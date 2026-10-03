import { KitchensService } from './kitchens.service';
export declare class KitchensController {
    private readonly kitchensService;
    constructor(kitchensService: KitchensService);
    findAll(): any[];
    findOne(id: string): any;
    create(body: any): {
        id: `${string}-${string}-${string}-${string}-${string}`;
        name: any;
        description: any;
        cuisineTypes: any;
        commissionRate: any;
        status: string;
        rating: number;
        createdAt: string;
    };
    update(id: string, body: any): any;
}

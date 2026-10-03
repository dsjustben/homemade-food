export declare class KitchensService {
    findAll(): any[];
    findOne(id: string): any;
    create(data: any): {
        id: `${string}-${string}-${string}-${string}-${string}`;
        name: any;
        description: any;
        cuisineTypes: any;
        commissionRate: any;
        status: string;
        rating: number;
        createdAt: string;
    };
    update(id: string, data: any): any;
}

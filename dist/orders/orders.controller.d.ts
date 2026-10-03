import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(): any[];
    findByKitchen(kitchenId: string): any[];
    findOne(id: string): any;
    create(body: any): Promise<{
        id: `${string}-${string}-${string}-${string}-${string}`;
        orderNumber: string;
        kitchenId: any;
        kitchenName: any;
        clientName: any;
        clientPhone: any;
        items: any;
        subtotal: any;
        deliveryFee: any;
        discount: number;
        promoCode: string | null;
        totalAmount: number;
        commissionRate: any;
        platformFee: number;
        kitchenPayout: number;
        status: string;
        paymentStatus: string;
        paymentMethod: string | null;
        deliveryAddress: any;
        timeSlot: any;
        comment: any;
        nutrition: any;
        createdAt: string;
    }>;
    updateStatus(id: string, body: {
        status: string;
    }): Promise<any>;
    pay(id: string, body: {
        method?: string;
    }): any;
}

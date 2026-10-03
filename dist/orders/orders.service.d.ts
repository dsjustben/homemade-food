export declare class OrdersService {
    findAll(): any[];
    findOne(id: string): any;
    findByKitchen(kitchenId: string): any[];
    create(data: any): Promise<{
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
    updateStatus(id: string, status: string): Promise<any>;
    pay(id: string, method?: string): any;
}

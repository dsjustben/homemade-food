export interface DbShape {
    kitchens: any[];
    menu: any[];
    orders: any[];
    users: any[];
    reviews: any[];
    partnerApplications: any[];
    orderCounter: number;
}
export declare function loadDb(): DbShape;
export declare function saveDb(db: DbShape): void;

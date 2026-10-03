import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    findAll(): any[];
    findPopular(): any[];
    findByKitchen(kitchenId: string): any[];
    findOne(id: string): any;
}

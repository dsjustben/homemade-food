import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        phone: string;
        name: string;
        role?: string;
    }): {
        id: `${string}-${string}-${string}-${string}-${string}`;
        phone: string;
        name: string;
        role: string;
        address: string;
        card: string;
        notifications: boolean;
        createdAt: string;
    };
    login(body: {
        phone: string;
    }): any;
    findAll(): any[];
    updateProfile(id: string, body: any): any;
}

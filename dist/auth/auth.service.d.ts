export declare class AuthService {
    register(data: {
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
    login(phone: string): any;
    findAll(): any[];
    updateProfile(id: string, data: any): any;
}

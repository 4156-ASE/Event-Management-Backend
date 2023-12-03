import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMyUser(params: {
        id: string;
    }, req: any): Promise<{
        user: {
            id: string;
            email: string;
            role: string;
            password: string;
            last_name: string;
            first_name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getUsers(): Promise<{
        users: {
            id: string;
            email: string;
        }[];
    }>;
}

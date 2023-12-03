import { UsersService } from './users.service';
import { UserUpdateDTO } from './dto/users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMyUser(params: {
        id: string;
    }, req: any): Promise<{
        user: {
            id: string;
            email: string;
            password: string;
            last_name: string;
            first_name: string;
            role: string;
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
    updateMyUser(params: {
        id: string;
    }, updateDTO: UserUpdateDTO, req: any): Promise<{
        message: string;
    }>;
}

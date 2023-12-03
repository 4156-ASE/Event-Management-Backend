import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { UserUpdateDTO } from './dto/users.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getMyUser(id: string, req: Request): Promise<{
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
    updateMyUser(id: string, updatedUser: UserUpdateDTO, req: Request): Promise<{
        message: string;
    }>;
}

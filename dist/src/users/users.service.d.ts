import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getMyUser(id: string, req: Request): Promise<{
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

import { PrismaService } from 'prisma/prisma.service';
import { AuthSignInDto, AuthSignUpDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    signup(dto: AuthSignUpDto): Promise<{
        message: string;
    }>;
    signin(dto: AuthSignInDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    signout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    hashPassword(password: string): Promise<string>;
    comparePassword(args: {
        password: string;
        hash: string;
    }): Promise<boolean>;
    signToken(args: {
        userId: string;
        email: string;
    }): Promise<string>;
}

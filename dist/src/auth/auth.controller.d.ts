/// <reference types="express" />
import { AuthService } from './auth.service';
import { AuthSignInDto, AuthSignUpDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(dto: AuthSignUpDto): Promise<{
        message: string;
    }>;
    signin(dto: AuthSignInDto, req: any, res: any): Promise<import("express").Response<any, Record<string, any>>>;
    signout(req: any, res: any): Promise<import("express").Response<any, Record<string, any>>>;
}

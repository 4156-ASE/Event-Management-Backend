"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../utils/constants");
let AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async signup(dto) {
        const { email, password, last_name, first_name } = dto;
        const foundUser = await this.prisma.user.findUnique({
            where: { email: email },
        });
        if (foundUser) {
            throw new common_1.BadRequestException('email already registered');
        }
        const hashedPassword = await this.hashPassword(password);
        await this.prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                last_name: last_name,
                first_name: first_name,
            },
        });
        return { message: 'signup was successful' };
    }
    async signin(dto, req, res) {
        const { email, password } = dto;
        const foundUser = await this.prisma.user.findUnique({
            where: { email: email },
        });
        if (!foundUser) {
            throw new common_1.BadRequestException('Email not registered');
        }
        const isMatch = await this.comparePassword({
            password,
            hash: foundUser.password,
        });
        if (!isMatch) {
            throw new common_1.BadRequestException('Wrong Password');
        }
        const token = await this.signToken({
            userId: foundUser.id,
            email: foundUser.email,
        });
        if (!token) {
            throw new common_1.ForbiddenException('Could not signin');
        }
        res.cookie('token', token, {});
        return res.send({
            status: 'success',
            token: token,
            userID: foundUser.id,
            message: 'Logged in',
        });
    }
    async signout(req, res) {
        res.clearCookie('token');
        return res.send({ status: 'success', message: 'Logged out succefully' });
    }
    async hashPassword(password) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }
    async comparePassword(args) {
        return await bcrypt.compare(args.password, args.hash);
    }
    async signToken(args) {
        const payload = {
            id: args.userId,
            email: args.email,
        };
        const token = await this.jwt.signAsync(payload, {
            secret: constants_1.jwtSecret,
        });
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
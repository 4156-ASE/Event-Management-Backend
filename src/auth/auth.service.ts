/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthSignInDto, AuthSignInResp, AuthSignUpDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async signup(dto: AuthSignUpDto) {
    const { email, password, lastname, firstname } = dto;
    const foundUser = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (foundUser) {
      const hashedPassword = await this.hashPassword(password);
      await this.prisma.user.update({
        where: {
          id: foundUser.id,
        },
        data: {
          password: hashedPassword,
          lastname: lastname,
          firstname: firstname,
        },
      });
    } else {
      const hashedPassword = await this.hashPassword(password);
      await this.prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          lastname: lastname,
          firstname: firstname,
        },
      });
    }
    return { message: 'signup was successful' };
  }
  async signin(dto: AuthSignInDto, res: Response) {
    const { email, password } = dto;
    const foundUser = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!foundUser) {
      throw new BadRequestException('Email not registered');
    }
    const isMatch = await this.comparePassword({
      password,
      hash: foundUser.password,
    });
    if (!isMatch) {
      throw new BadRequestException('Wrong Password');
    }
    const token = await this.signToken({
      userId: foundUser.id,
      email: foundUser.email,
    });
    if (!token) {
      throw new ForbiddenException('Could not signin');
    }
    res.cookie('token', token, {});
    return res.send({
      status: 'success',
      token: token,
      userID: foundUser.id,
      message: 'Logged in',
      user: {
        id: foundUser.id,
        email: foundUser.email,
        lastname: foundUser.lastname,
        firstname: foundUser.firstname,
        role: foundUser.role,
      },
    } as unknown as AuthSignInResp);
  }

  async signout(res: Response) {
    res.clearCookie('token');
    return res.send({ status: 'success', message: 'Logged out succefully' });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePassword(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }
  async signToken(args: { userId: string; email: string }) {
    const payload = {
      id: args.userId,
      email: args.email,
    };

    const token = await this.jwt.signAsync(payload);

    return token;
  }
}

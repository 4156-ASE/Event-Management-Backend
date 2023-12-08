import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { UserUpdateDTO } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsersByIds(ids: string[]) {
    const users = await this.prisma.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return users;
  }

  async getUsersByEmail(emails: string[]) {
    const users = await this.prisma.user.findMany({
      where: {
        email: {
          in: emails,
        },
      },
    });

    return users;
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: { id: true, email: true },
    });

    return { users };
  }

  async updateMyUser(id: string, updatedUser: UserUpdateDTO, req: Request) {
    const decodedUserInfo = req.user as { id: string; email: string };

    const updateUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: updatedUser.email,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
      },
    });

    if (!updateUser) {
      throw new NotFoundException();
    }

    if (updateUser.id !== decodedUserInfo.id) {
      throw new ForbiddenException();
    }
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    return user;
  }
}

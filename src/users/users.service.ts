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

  async getMyUser(id: string, req: Request) {
    const decodedUserInfo = req.user as { id: string; email: string };

    const foundUser = await this.prisma.user.findUnique({ where: { id } });

    if (!foundUser) {
      throw new NotFoundException();
    }

    if (foundUser.id !== decodedUserInfo.id) {
      throw new ForbiddenException();
    }

    delete foundUser.password;

    return { user: foundUser };
  }

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
    return { message: 'updated' };
  }
}

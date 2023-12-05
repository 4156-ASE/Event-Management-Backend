import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserUpdateDTO } from './dto/users.dto';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMyUser(@Req() req: Request) {
    const users = await this.usersService.getUsersByIds([req.user.id]);

    if (!users.length) {
      throw new UnauthorizedException();
    }

    return users[0];
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Patch('me/:id')
  updateMyUser(
    @Param() params: { id: string },
    @Body() updateDTO: UserUpdateDTO,
    @Req() req,
  ) {
    return this.usersService.updateMyUser(params.id, updateDTO, req);
  }
}

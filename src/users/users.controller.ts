import { Body, Controller, Get, Param, Patch, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserUpdateDTO } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me/:id')
  getMyUser(@Param() params: { id: string }, @Req() req) {
    return this.usersService.getMyUser(params.id, req);
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

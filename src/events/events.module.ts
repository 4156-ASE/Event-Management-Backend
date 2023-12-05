import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { EventsService } from './events.service';

@Module({
  controllers: [EventsController],
  providers: [JwtStrategy, UsersService, EventsService],
})
export class EventsModule {}

import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [EventsController],
  providers: [JwtStrategy],
})
export class EventsModule {}

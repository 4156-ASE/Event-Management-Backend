import { Injectable } from '@nestjs/common';
import { EMSEventDetail } from 'src/utils/ems.dto';
import { EventDetail } from './events.dto';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import { UserDetail } from 'src/users/dto/users.dto';

function toUserDetail(user: User): UserDetail {
  return {
    id: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
  };
}

function toEventDetail(emsEvent: EMSEventDetail, users: User[]): EventDetail {
  const host = users.find((u) => u.id === emsEvent.host);
  return {
    id: emsEvent.id,
    title: emsEvent.title,
    desc: emsEvent.desc,
    location: emsEvent.location,
    host: toUserDetail(host),
    participants: users
      .filter((u) => emsEvent.participants.includes(u.id))
      .map(toUserDetail),
    start_time: emsEvent.start_time,
    end_time: emsEvent.end_time,
  };
}

@Injectable()
export class EventsService {
  constructor(private userService: UsersService) {}

  async getEventDetailByEMSEvent(
    emsEvent: EMSEventDetail,
  ): Promise<EventDetail> {
    const emailsResp = await this.userService.getUsersByEmail(
      emsEvent.participants,
    );
    const user_ids = emailsResp.map((x) => x.id);
    const users = await this.userService.getUsersByIds(
      [emsEvent.host].concat(user_ids),
    );
    emsEvent.participants = user_ids;
    return toEventDetail(emsEvent, users);
  }
}

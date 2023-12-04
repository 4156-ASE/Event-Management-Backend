import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import {
  AddUserReq,
  ChangeHostReq,
  EventCreateReq,
  EventDetail,
  EventUpdateReq,
  RemoveUserReq,
} from './events.dto';
import { loginAndSaveJWT } from '../utils/request';

const users = [
  {
    id: '1',
    lastname: 'shi',
    firstname: 'xiaozhou',
    email: 'xiaozhou@gmail.com',
  },
  {
    id: '2',
    lastname: 'awd',
    firstname: 'dwadw',
    email: 'xiaozhodawdwu@gmail.com',
  },
  {
    id: '3',
    lastname: 'afwawd',
    firstname: 'dfwawadw',
    email: 'xiaofwadwu@gmail.com',
  },
];

const eventDetail = {
  id: '1',
  title: 'title',
  desc: 'desc',
  start_time: '2023-12-03T22:44:12.617Z',
  end_time: '2023-12-04T22:44:12.617Z',
  location: 'New York',
  host: users[0],
  participants: users.slice(1),
};

@Controller('events')
export class EventsController {
  constructor() {
    // login and save jwt at init
    loginAndSaveJWT()
      .then(() => {
        console.log('Login ems success');
      })
      .catch((e) => {
        throw e;
      });
  }

  /** Create An Event */
  @Post()
  async create(@Body() body: EventCreateReq): Promise<EventDetail> {
    console.log(body);

    return Promise.resolve(eventDetail);
  }

  /** Get An Event */
  @Get(':id')
  async event(@Param('id') id: string): Promise<EventDetail> {
    console.log(id);

    return Promise.resolve(eventDetail);
  }

  /** Get Events */
  @Get()
  async events(): Promise<Array<EventDetail>> {
    return Promise.resolve([eventDetail]);
  }

  /** Update An Event */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: EventUpdateReq,
  ): Promise<EventDetail> {
    console.log(id, body);

    return Promise.resolve(eventDetail);
  }

  /** Add user to an event */
  @Post('add_user')
  async addUserByEmail(@Body() body: AddUserReq): Promise<EventDetail> {
    console.log(body);

    return Promise.resolve(eventDetail);
  }

  /**
   * Remove user from an event
   *
   * Host cannot remove himself.
   */
  @Post('remove_user')
  async removeUser(@Body() body: RemoveUserReq): Promise<EventDetail> {
    console.log(body);

    return Promise.resolve(eventDetail);
  }

  /** Change an event's host */
  @Post('change_host')
  async changeHost(@Body() body: ChangeHostReq): Promise<EventDetail> {
    console.log(body);

    return Promise.resolve(eventDetail);
  }

  /**
   * Quit from an event
   *
   * Host cannot quit.
   */
  @Post('quit')
  async quit(@Body() body: ChangeHostReq): Promise<EventDetail> {
    console.log(body);

    return Promise.resolve(eventDetail);
  }

  /**
   * Delete an event
   *
   * Only host can do.
   */
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    console.log(id);

    return;
  }
}

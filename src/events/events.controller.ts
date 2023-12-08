import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import {
  AddUserReq,
  ChangeHostReq,
  EventCreateReq,
  EventDetail,
  EventUpdateReq,
  RemoveUserReq,
} from './events.dto';
import { loginAndSaveJWT } from '../utils/request';
import { EMS_APIs } from 'src/utils/api';
import { EventsService } from './events.service';
import { PrismaService } from 'prisma/prisma.service';

@Controller('events')
export class EventsController {
  constructor(
    private eventsService: EventsService,
    private prisma: PrismaService,
  ) {
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
  async create(
    @Body() body: EventCreateReq,
    @Req() req: Request,
  ): Promise<EventDetail> {
    const resp = await EMS_APIs.createEvent({
      ...body,
      host: req.user.id,
      participants: [],
    });

    return this.eventsService.getEventDetailByEMSEvent(resp.data);
  }

  /** Get An Event */
  @Get(':id')
  async event(@Param('id') id: string): Promise<EventDetail> {
    const resp = await EMS_APIs.getEvent({
      eid: id,
    });
    return this.eventsService.getEventDetailByEMSEvent(resp.data);
  }

  /** Get Events by User */
  @Get()
  async events(@Req() req: Request): Promise<Array<EventDetail>> {
    const resp = await EMS_APIs.getEvents({ pid: req.user.id });

    return await Promise.all(
      resp.data.map((v) => this.eventsService.getEventDetailByEMSEvent(v)),
    );
  }

  /** Update An Event */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: EventUpdateReq,
  ): Promise<EventDetail> {
    console.log(body);
    const resp = await EMS_APIs.updateEvent({ eid: id }, body);
    return this.eventsService.getEventDetailByEMSEvent(resp.data);
  }

  /** Add user to an event */
  @Patch(':id/add_user')
  async addUserByEmail(
    @Param('id') id: string,
    @Body() body: AddUserReq,
    @Req() req: Request,
  ): Promise<EventDetail> {
    let resp = await EMS_APIs.getEvent({
      eid: id,
    });

    const event = resp.data;

    if (event.host !== req.user.id) {
      throw new UnauthorizedException('Not host of this event.');
    }
    const user = await this.prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      await this.prisma.user.create({
        data: {
          email: body.email,
          lastname: body.lastname,
          firstname: body.firstname,
          password: '',
        },
      });
    }

    if (event.host === user.id) {
      throw new BadRequestException('Cannot add yourself.');
    }
    event.participants = Array.from(
      new Set(event.participants.concat(user.email)),
    );
    const host_user = await this.prisma.user.findFirst({
      where: {
        id: event.host,
      },
    });
    resp = await EMS_APIs.updateEvent(
      { eid: id },
      {
        host_email: host_user.email,
        host_name: host_user.firstname + ' ' + host_user.lastname,
        participants: event.participants,
        participants_email: [user.email],
        participants_name: [user.firstname + ' ' + user.lastname],
      },
    );
    return this.eventsService.getEventDetailByEMSEvent(resp.data);
  }

  /**
   * Remove user from an event
   *
   * Host cannot remove himself.
   */
  @Patch(':id/remove_user')
  async removeUser(
    @Body() body: RemoveUserReq,
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<EventDetail> {
    let resp = await EMS_APIs.getEvent({
      eid: id,
    });
    const event = resp.data;
    console.log(event);

    if (event.host !== req.user.id) {
      throw new UnauthorizedException('Not host of this event.');
    }
    const user = await this.prisma.user.findFirst({
      where: {
        id: body.userId,
      },
    });

    console.log(user);

    if (!user) {
      throw new NotFoundException('Not found user.');
    }

    if (event.host === user.id) {
      throw new BadRequestException('Cannot remove yourself.');
    }
    const users = await this.prisma.user.findMany({
      where: {
        email: {
          in: event.participants,
        },
      },
    });
    const user_ids = users.map((x) => x.id);
    event.participants = user_ids.filter((p) => p !== user.id);
    const emails = await this.prisma.user.findMany({
      where: {
        id: {
          in: event.participants,
        },
      },
    });
    event.participants = emails.map((x) => x.email);

    console.log(event);
    resp = await EMS_APIs.updateEvent(
      { eid: id },
      {
        participants: event.participants,
      },
    );
    return this.eventsService.getEventDetailByEMSEvent(resp.data);
  }

  /** Change an event's host */
  @Patch(':id/change_host')
  async changeHost(
    @Body() body: ChangeHostReq,
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<EventDetail> {
    let resp = await EMS_APIs.getEvent({
      eid: id,
    });
    const event = resp.data;
    if (event.host !== req.user.id) {
      throw new UnauthorizedException('Not host of this event.');
    }

    const user = await this.prisma.user.findFirst({
      where: {
        id: body.userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Not found user.');
    }

    if (event.host !== req.user.id) {
      throw new BadRequestException('Not host of this event');
    }

    if (event.host === body.userId) {
      throw new BadRequestException('Cannot change host to yourself.');
    }

    event.host = body.userId;
    console.log(event.participants);
    event.participants = Array.from(
      new Set(
        event.participants
          .filter((v) => v !== user.email)
          .concat(req.user.email),
      ),
    );
    console.log(event);
    resp = await EMS_APIs.updateEvent({ eid: id }, event);
    console.log(resp);
    return this.eventsService.getEventDetailByEMSEvent(resp.data);
  }

  /**
   * Quit from an event
   *
   * Host cannot quit.
   */
  @Patch(':id/quit')
  async quit(@Param('id') id: string, @Req() req: Request) {
    let resp = await EMS_APIs.getEvent({
      eid: id,
    });

    const event = resp.data;

    if (event.host === req.user.id) {
      throw new BadRequestException('Host cannot quit.');
    }

    const user = await this.prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      throw new NotFoundException('Not found user.');
    }

    event.participants = event.participants.filter((v) => v !== req.user.id);

    resp = await EMS_APIs.updateEvent(
      { eid: id },
      {
        participants_email: event.participants,
      },
    );

    return 'ok';
  }

  /**
   * Delete an event
   *
   * Only host can do.
   */
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    const resp = await EMS_APIs.getEvent({
      eid: id,
    });

    const event = resp.data;

    if (event.host !== req.user.id) {
      throw new UnauthorizedException('Only host can delete.');
    }

    await EMS_APIs.deleteEvent({
      eid: id,
    });

    return 'ok';
  }
}

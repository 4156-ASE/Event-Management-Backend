import {
  EMSEventCreateReq,
  EMSEventDetail,
  EMSEventUpdateReq,
} from './ems.dto';
import { requestEMS } from './request';

/** APIs of Event Management Service */
export const EMS_APIs = {
  /** create an event */
  async createEvent(body: EMSEventCreateReq) {
    return await requestEMS.post<EMSEventDetail>('/events', body);
  },
  /** get events */
  async getEvents(query: { pid: string; email: string }) {
    return await requestEMS.get<EMSEventDetail[]>(
      `/events?pid=${query.pid}&email=${query.email}`,
    );
  },

  /** get an event */
  async getEvent(query: { eid: string }) {
    return await requestEMS.get<EMSEventDetail>(`/events/${query.eid}`);
  },
  /** update an event */
  async updateEvent(query: { eid: string }, data: EMSEventUpdateReq) {
    return await requestEMS.patch<EMSEventDetail>(`/events/${query.eid}`, data);
  },
  /** delete an event */
  async deleteEvent(query: { eid: string }) {
    return await requestEMS.delete<boolean>(`/events/${query.eid}`);
  },
  /** login ems */
  async login() {
    return await requestEMS.post<string>('/auth/login', {
      access_id: process.env.access_id,
      access_secret: process.env.access_secret,
    });
  },
};

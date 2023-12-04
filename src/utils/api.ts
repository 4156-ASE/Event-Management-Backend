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
  async getEvents(query: { pid: string }) {
    return await requestEMS.get<EMSEventDetail[]>('/events', {
      params: query,
    });
  },
  /** get an event */
  async getEvent(query: { eid: string }) {
    return await requestEMS.get<EMSEventDetail>(`/events/${query.eid}`);
  },
  /** update an event */
  async updateEvent(query: { eid: string }, data: EMSEventUpdateReq) {
    return await requestEMS.put<EMSEventDetail>(`/events/${query.eid}`, data);
  },
  /** delete an event */
  async deleteEvent(query: { eid: string }) {
    return await requestEMS.delete<boolean>(`/events/${query.eid}`);
  },
};

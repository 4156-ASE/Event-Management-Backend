export interface EMSEventCreateReq {
  title: string;

  desc: string;

  start_time: string;

  end_time: string;

  location: string;

  host: string;

  participants: string[];
}

export class EMSEventUpdateReq {
  title?: string;

  desc?: string;

  start_time?: string;

  end_time?: string;

  location?: string;

  host_email?: string;

  host_name?: string;

  participants?: string[];

  participants_email?: string[];

  participants_name?: string[];
}

export class EMSEventDetail {
  id: string;

  title: string;

  desc: string;

  start_time: string;

  end_time: string;

  location: string;

  host: string;

  participants: string[];

  /** client cid */
  cid: string;
}

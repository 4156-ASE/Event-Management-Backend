import { Request as ExpressRequest } from 'express';
declare module 'express' {
  interface Request extends ExpressRequest {
    /** authorized client by auth.guard.ts */
    user: {
      id: string;
      email: string;
    };
  }
}

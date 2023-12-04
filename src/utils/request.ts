import axios from 'axios';
import { EMS_APIs } from './api';

export const localStorage = {
  /** jwt for ems */
  'ems:auth': '' as string,
};

/** request for event management service */
export const requestEMS = axios.create({
  baseURL: process.env.EMS_BASE_URL,
  timeout: 12 * 10000,
});

// set every request headers with JWT Token
requestEMS.interceptors.request.use((req) => {
  const JWTToken = localStorage['ems:auth'] || '';
  if (JWTToken) {
    req.headers.Authorization = `Bearer ${JWTToken}`;
  }
  return req;
});

export async function loginAndSaveJWT() {
  const resp = await EMS_APIs.login();
  localStorage['ems:auth'] = resp.data;
}

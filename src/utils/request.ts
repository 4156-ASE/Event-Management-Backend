import axios from 'axios';

/** request for event management service */
export const requestEMS = axios.create({
  baseURL: process.env.EMS_BASE_URL,
  timeout: 12 * 10000,
});

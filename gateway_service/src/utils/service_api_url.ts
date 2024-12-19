import * as dotenv from 'dotenv';
dotenv.config();

export const Service_Api_Url = {
  auth_service: process.env.AUTH_SERVICE_URL,
};

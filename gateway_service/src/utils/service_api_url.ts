import * as dotenv from 'dotenv';
dotenv.config();

export const Service_Api_Url = {
  auth_service: process.env.AUTH_SERVICE_URL,
  property_mgt_service: process.env.PROPERTY_MNGT_SERVICE_URL,
  job_mgt_service: process.env.JOB_MNGT_SERVICE_URL,
};

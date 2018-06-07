import dotenv from 'dotenv';

// set env variables from `.env` file
dotenv.config();

const env = {
  ADMIN: process.env.ADMIN,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};

export default env;

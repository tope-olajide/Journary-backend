/* eslint-disable linebreak-style */
import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
  production: {
    url: process.env.POSTGRESQL_ADDON_URI,
    database: process.env.POSTGRESQL_ADDON_DB,
    user: process.env.POSTGRESQL_ADDON_USER,
    password: process.env.POSTGRESQL_ADDON_PASSWORD,
    host: process.env.POSTGRESQL_ADDON_HOST,
  },
  jwtSecret: process.env.JWT_SECRET,
  email: process.env.email,
  password: process.env.password

};

export default config;

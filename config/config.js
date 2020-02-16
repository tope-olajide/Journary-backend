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
    connectionString: process.env.DATABASE_URL,
  },
  jwtSecret: process.env.JWT_SECRET,
  email: process.env.email,
  password: process.env.password

};

export default config;

import { loadEnvFile } from 'node:process';
import mysql from 'mysql2/promise';
// import { ConfigModule } from '@nestjs/config';
// 로컬
loadEnvFile();
// await ConfigModule.envVariablesLoaded;
const host = process.env.DB_HOST ?? 'localhost';
const port = Number(process.env.DB_PORT ?? '3306');




export const pool = mysql.createPool({
  host,
  port,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

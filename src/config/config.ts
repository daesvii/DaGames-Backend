export type DbType =
  | 'mysql'
  | 'postgres'
  | 'sqlite'
  | 'mariadb'
  | 'mssql'
  | 'oracle'
  | 'cordova'
  | 'nativescript'
  | 'expo';

import * as dotenv from 'dotenv';

dotenv.config();

export const dbConfig = {
  type: process.env.DB_TYPE as DbType,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

/* eslint-disable @typescript-eslint/no-var-requires */
import { resolve } from 'path';
import { DataSource } from 'typeorm';
import pgDriver from 'pg';
import dotenv from 'dotenv';
import configOptions from '../index';

dotenv.config();
const options = configOptions();

const datasource = new DataSource({
  driver: pgDriver,
  type: 'postgres',
  host: options.database.host,
  port: +options.database.port,
  username: options.database.user,
  password: options.database.pass,
  database: options.database.name,
  ssl: options.database.ssl,
  synchronize: false,
  migrations: [resolve(__dirname, 'migrations', '*{.ts,.js}')],
  entities: [resolve(__dirname, '..', '..', '*.entity{.ts,.js}')],
});

console.log(resolve(__dirname, 'migrations', '*.{ts.js}'));

datasource.initialize();

export default datasource;

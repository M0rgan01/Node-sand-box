import { Sequelize, Dialect, Options } from '@sequelize/core';
import { isProduction } from '../config/environment';

const options: Options = {
  host: 'localhost',
  port: 5433,
  dialect: 'postgres' as Dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const db = isProduction
  ? new Sequelize('app_database', 'admin', 'password', options)
  : new Sequelize('sqlite::memory:');

export default db;

import { Sequelize, Dialect, Options } from '@sequelize/core';

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

const db = new Sequelize('app_database', 'admin', 'password', options);

export default db;

import Sequelize from 'sequelize';

const db = new Sequelize('app_database', 'admin', 'password', {
  host: 'localhost',
  port: 5433,
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

export default db;
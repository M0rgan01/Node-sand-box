import express from 'express';
import { getKeycloak, memoryStore } from './security/keycloak';
import cors from 'cors';
import routes from './routes/routes';
import db from './database/sequelize';
import { insertTodos } from './fixtures';
import { getAppPort, getSessionSecret } from './config/environment';
import logger from './config/logger';
import { errorHandler } from './errorHandler';
import session from 'express-session';

export async function createServer() {
  const app = express();
  const keycloakInstance = getKeycloak();

  app.use(
    session({
      secret: getSessionSecret(),
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    })
  );

  // ---------- SECURITY ----------
  app.use(cors());
  app.use(keycloakInstance.middleware());

  // ---------- JSON PARSED ----------
  app.use(express.json());

  // ---------- ROUTING ----------
  app.use('/todoAPI/', routes);
  app.use(errorHandler);

  // ---------- DATABASE / FIXTURES ----------
  try {
    await db.authenticate();
    logger.info('Successful authenticate to database !');
    await db.sync();
    logger.info('Successful database synchronisation !');
    await insertTodos();
    logger.info('Successful create seeds !');
  } catch (e) {
    logger.error('Error when trying to init database setup : ' + e);
    process.exit(1);
  }

  return app;
}

createServer().then((app) => {
  const port = getAppPort();
  // ---------- APPLICATION START ----------
  app
    .listen(port, () => {
      logger.info(`APP Listen to port : ` + port);
      app.emit('ready');
    })
    .on('error', (err) => {
      logger.error('error : ' + err);
      process.exit(1);
    });
});

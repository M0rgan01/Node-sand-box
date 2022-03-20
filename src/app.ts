import express from 'express';
import { getKeycloak, memoryStore } from './keycloak';
import cors from 'cors';
import routes from './routes/routes';
import db from './database/sequelize';
import { insertTodos } from './fixtures';
import { getAppPort } from './config/environment';
import logger from './config/logger';
import { errorHandler } from './errorHandler';
import session from 'express-session';

const app = express();
const keycloakInstance = getKeycloak();

app.use(
  session({
    secret: 'some secret',
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
// test the database connection
db.authenticate()
  .then(() => {
    logger.info('Successful authenticate to database !');
    // create // update all table if needed
    db.sync()
      .then(() => {
        logger.info('Successful database synchronisation !');
        // insert seeds if needed
        insertTodos().then(() => {
          logger.info('Successful create seeds !');
          const port = getAppPort();

          // ---------- APPLICATION START ----------
          app
            .listen(port, () => {
              logger.info(`APP Listen to port : ` + port);
            })
            .on('error', (err) => {
              logger.crit('error :' + err);
            });
        });
      })
      .catch((error) => {
        logger.crit(
          'Error when trying to synchronisation with database : ' + error
        );
      });
  })
  .catch((error) => {
    logger.crit('Error when trying to connect database : ' + error);
  });

export default app;

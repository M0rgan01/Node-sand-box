import express from 'express';
import { getKeycloak, memoryStore } from './keycloak';
import cors from 'cors';
import routes from './routes/routes';
import session from 'express-session';
import db from './database/sequelize';
import { insertTodos } from './fixtures';
import { getAppPort } from './config/environment';
import logger from './config/logger';

const app = express();
const keycloakInstance = getKeycloak();

// ---------- DATABASE / FIXTURES ----------
db.authenticate()
  .then(() => {
    logger.info('Successful authenticate to database !');
  })
  .catch((error) => {
    logger.crit('Error when trying to connect database : ' + error);
  });

(async () => await insertTodos())();

// ---------- SECURITY ----------
app.use(cors());
app.use(
  session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);
app.use(keycloakInstance.middleware());

// ---------- JSON PARSED ----------
// to support JSON-encoded bodies
app.use(express.json);


// ---------- ROUTING ----------
app.use('/todoAPI/', routes);

const port = getAppPort();
app
  .listen(port, () => {
    logger.info(`APP Listen to port : ` + port);
  })
  .on('error', (err) => {
    logger.crit('error :' + err);
  });

export default app;

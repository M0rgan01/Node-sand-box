import express from 'express';
import { getKeycloak, memoryStore } from './keycloak.js';
import cors from 'cors';
import router from './routes.js';
import session from 'express-session';

const app = express();
const port = 8080;
const keycloakInstance = getKeycloak();

app.use(cors());
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));
app.use(keycloakInstance.middleware());
app.use('/todoAPI/', router);

app.listen(port, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`APP Listen to port : ` + port);
  }
});
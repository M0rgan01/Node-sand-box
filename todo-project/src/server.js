import express from 'express';
import { getKeycloak, memoryStore } from './keycloak.js';
import cors from 'cors';
import router from './routes.js';
import session from 'express-session';
import db from './database/sequelize.js';
import { insertTodos } from './fixtures.js';
import bodyParser from 'body-parser';

const app = express();
const port = 8080;
const keycloakInstance = getKeycloak();

// ---------- DATABASE / FIXTURES ----------
db.authenticate()
  .then(() => { console.log('Successful authenticate to database !'); })
  .catch(error => { console.log('Error when trying to connect database : ' + error); });

await insertTodos();

// ---------- SECURITY ----------
app.use(cors());
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));
app.use(keycloakInstance.middleware());

// ---------- JSON PARSED ----------
// to support JSON-encoded bodies
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// ---------- ROUTING ----------
app.use('/todoAPI/', router);


app.listen(port, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`APP Listen to port : ` + port);
  }
});
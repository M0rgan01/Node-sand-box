import express from 'express';
import bodyParser from 'body-parser';
import {initKeycloak} from './keycloak.js';

const app = express();
const port = 8080;
const basePath = '/todoAPI/'
const keycloakInstance = initKeycloak();

app.use(keycloakInstance.middleware());

app.get(basePath + '/todos', (req, resp) => {
  resp.send('Salut ! tu es à la racine');
});

app.get(basePath + '/todo/id', (req, resp) => {
  resp.send('Salut ! tu es à la racine');
});

app.post(basePath + '/todo', (req, resp) => {
  resp.send('Salut ! tu es à la racine');
});

app.put(basePath + '/todo', (req, resp) => {
  resp.send('Salut ! tu es à la racine');
});

app.delete(basePath + '/todo', (req, resp) => {
  resp.send('Salut ! tu es à la racine');
});

app.get(basePath + 'unsecured', function(req, res) {
  res.json({ message: 'This is an unsecured endpoint payload' });
});

app.get(basePath + 'user', keycloakInstance.protect('realm:user'), function(req, res) {
  res.json({ message: 'This is an USER endpoint payload' });
});

app.get(basePath + 'admin', keycloakInstance.protect('realm:admin'), function(req, res) {
  res.json({ message: 'This is an ADMIN endpoint payload' });
});

app.listen(port, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`APP Listen to port : ` + port);
  }
});
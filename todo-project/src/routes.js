import { initKeycloak, hasAdminRole } from './keycloak.js';
import express from 'express';
import Todo from './database/models/todo.js';

const keycloakInstance = initKeycloak();
const router = express.Router();

router.get('/todos', keycloakInstance.protect(hasAdminRole), async (req, resp) => {
  const todos = await Todo.findAll();
  resp.json(todos);
});

router.get('/todo/id', (req, resp) => {
  resp.send('Salut ! tu es à la racine');
});

router.post('/todo', (req, resp) => {
  resp.send('Salut ! tu es à la racine');
});

router.put('/todo', (req, resp) => {
  resp.send('Salut ! tu es à la racine');
});

router.delete('/todo', (req, resp) => {
  resp.send('Salut ! tu es à la racine');
});

router.get('unsecured', function (req, res) {
  res.json({ message: 'This is an unsecured endpoint payload' });
});

router.get('user', function (req, res) {
  res.json({ message: 'This is an USER endpoint payload' });
});

router.get('admin', function (req, res) {
  res.json({ message: 'This is an ADMIN endpoint payload' });
});

router.get('/', (req, resp) => {
  resp.send('Salut ! tu es à la racine');
});

export default router;


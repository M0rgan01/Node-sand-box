import { initKeycloak, hasAdminRole } from './keycloak.js';
import express from 'express';
import Todo from './database/models/todo.js';

const keycloakInstance = initKeycloak();
const router = express.Router();

router.get('/todos', keycloakInstance.protect(hasAdminRole), async (req, resp) => {
  const todos = await Todo.findAll();
  resp.status(200).json(todos);
});

router.put('/todo/id', keycloakInstance.protect(hasAdminRole), async (req, resp) => {
  const todo = req.body.title;
  await Todo.update(todo, { where: { id: todo.id } });
  resp.status(200).send();
});

router.post('/todo', keycloakInstance.protect(hasAdminRole), async (req, resp) => {
  const todo = req.body;
  await Todo.create({ id: todo.id, title: todo.title,  complete: false});
  resp.status(201).send();
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


import { getKeycloak, hasAdminRole } from '../keycloak';
import express from 'express';
import Todo from '../database/models/Todo';

const keycloakInstance = getKeycloak();
const router = express.Router();

router.get(
  '/todos',
  keycloakInstance.protect(hasAdminRole),
  async (req, resp) => {
    const todos = await Todo.findAll();
    resp.status(200).json(todos);
  }
);

router.put(
  '/todo/id',
  keycloakInstance.protect(hasAdminRole),
  async (req, resp) => {
    const todo = req.body.title;
    await Todo.update(todo, { where: { id: todo.id } });
    resp.status(200).send();
  }
);

router.post(
  '/todo',
  keycloakInstance.protect(hasAdminRole),
  async (req, resp) => {
    const todo = req.body;
    await Todo.create({ id: todo.id, title: todo.title, complete: false });
    resp.status(201).send();
  }
);

export default router;

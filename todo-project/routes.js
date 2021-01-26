import { initKeycloak, hasAdminRole } from './keycloak.js';
import express from 'express';

const keycloakInstance = initKeycloak();
const basePath = '/todoAPI/';
const router = express.Router();

const initialState = [
  {
    id: 1,
    title: 'Title1',
    complete: false,
  },
  {
    id: 2,
    title: 'Title2',
    complete: true,
  },
  {
    id: 3,
    title: 'Title3',
    complete: true,
  },
  {
    id: 4,
    title: 'Title4',
    complete: false,
  },
  {
    id: 5,
    title: 'Title5',
    complete: true,
  },
  {
    id: 6,
    title: 'Title6',
    complete: false,
  },
];

router.get('/todos', keycloakInstance.protect(hasAdminRole), (req, resp) => {
  resp.json(initialState);
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


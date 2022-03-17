import express from 'express';
import todos from './todos';

const router = express.Router();

router.use(todos);

export default router;

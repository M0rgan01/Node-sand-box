import express from 'express';
import todos from './todos';
import publicRoutes from './public';

const router = express.Router();

router.use(todos);
router.use(publicRoutes);

export default router;

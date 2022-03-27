import express from 'express';

const router = express.Router();

router.get('/public/info', async (req, resp) => {
  resp.status(200).json('Healthy');
});

export default router;

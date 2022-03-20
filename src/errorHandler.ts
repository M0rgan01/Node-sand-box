import type { ErrorRequestHandler } from 'express';
import logger from './config/logger';

// error handler need 4 parameters to work
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
  logger.info('Err :', err.message);
  // default to 500 server error
  return res.status(500).json({ message: err.message });
};

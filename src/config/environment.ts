import { config as loadDotEnvConfig } from 'dotenv';

export const getAppPort = () => process.env.APP_PORT || 8080;

export const checkEnvironments = () => {
  if (process.env.NODE_ENV !== 'production') {
    loadDotEnvConfig();
  }
};

import { config as loadDotEnvConfig } from 'dotenv';

export const getAppPort = () => process.env.APP_PORT || 8081;
export const getNodeEnvironment = () => process.env.NODE_ENV;
export const isProduction = getNodeEnvironment() === 'production';

export const checkEnvironments = () => {
  if (!isProduction) {
    loadDotEnvConfig();
  }
};

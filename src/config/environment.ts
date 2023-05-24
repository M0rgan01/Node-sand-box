import { config as loadDotEnvConfig } from 'dotenv';

export const getKeycloakAuthURL = () =>
  process.env.KEYCLOAK_AUTH_URL || 'http://localhost:8080/';
export const getKeycloakRealm = () => process.env.KEYCLOAK_REALM || 'TodoRealm';
export const getKeycloakClient = () => process.env.KEYCLOAK_CLIENT || 'TodoAPI';
export const getAppPort = () => process.env.PORT || 8081;
export const getSessionSecret = () => process.env.SESSION_SECRET || 'secret';
export const getNodeEnvironment = () => process.env.NODE_ENV;
export const isProduction = getNodeEnvironment() === 'production';

export const checkEnvironments = () => {
  if (!isProduction) {
    loadDotEnvConfig();
  }
};

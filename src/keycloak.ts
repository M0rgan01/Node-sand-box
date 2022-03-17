import session from 'express-session';
import KeycloakConnect from 'keycloak-connect';
import logger from './config/logger';

let keycloakInstance: KeycloakConnect.Keycloak;

const keycloakConfig: KeycloakConnect.KeycloakConfig = {
  'auth-server-url': 'http://localhost/auth',
  'bearer-only': true,
  'confidential-port': '80',
  'ssl-required': '',
  realm: 'TodoRealm',
  resource: '',
};

export const memoryStore = new session.MemoryStore();

export function hasAdminRole(token: KeycloakConnect.Token) {
  return token.hasRealmRole('admin');
}

export function hasUserRole(token: KeycloakConnect.Token) {
  return token.hasRealmRole('user') || token.hasRealmRole('admin');
}

export function getKeycloak() {
  if (!keycloakInstance) {
    logger.info('Initializing Keycloak...');
    keycloakInstance = new KeycloakConnect(
      { store: memoryStore },
      keycloakConfig
    );
  }
  return keycloakInstance;
}

import session from 'express-session';
import Keycloak from 'keycloak-connect';

let keycloakInstance;

const keycloakConfig = {
  clientId: 'TodoAPI',
  bearerOnly: true,
  serverUrl: 'http://localhost/auth',
  realm: 'TodoRealm',
  credentials: {
    secret: '494d638c-2627-41fb-9417-75c7f4c170a1',
  },
};

export const memoryStore = new session.MemoryStore();

export function hasAdminRole(token, request) {
  return token.hasRealmRole('admin');
}

export function hasUserRole(token, request) {
  return token.hasRealmRole('user') || token.hasRealmRole('admin');
}

export function initKeycloak() {
  if (keycloakInstance) {
    console.warn("Trying to init Keycloak again!");
    return keycloakInstance;
  } else {
    console.log("Initializing Keycloak...");
    keycloakInstance = new Keycloak({ store: memoryStore }, keycloakConfig ? keycloakConfig : undefined);
    return keycloakInstance;
  }
}

export function getKeycloak() {
  if (!keycloakInstance){
    console.error('Keycloak has not been initialized. Please called init first.');
  }
  return keycloakInstance;
}
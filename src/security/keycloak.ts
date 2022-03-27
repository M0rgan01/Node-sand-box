import KeycloakConnect from 'keycloak-connect';
import logger from '../config/logger';
import session from 'express-session';
import {
  getKeycloakAuthURL,
  getKeycloakClient,
  getKeycloakRealm,
} from '../config/environment';
import { NextFunction, Request, Response } from 'express';

export const memoryStore = new session.MemoryStore();
let keycloakInstance: KeycloakConnect.Keycloak;

const keycloakConfig: KeycloakConnect.KeycloakConfig = {
  'auth-server-url': getKeycloakAuthURL(),
  'bearer-only': true,
  'confidential-port': '0',
  'ssl-required': 'external',
  realm: getKeycloakRealm(),
  resource: getKeycloakClient(),
};

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
    logger.info('Keycloak instance has been created');
  }
  return keycloakInstance;
}

export async function onlineMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.headers.authorization) {
    try {
      // const result = await keycloakInstance.grantManager.userInfo(req.headers.authorization);
      const result = await keycloakInstance.grantManager.validateAccessToken(
        req.headers.authorization
      );
      if (!result) {
        res.status(401).json({ message: 'unauthorized' });
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(401).json({ message: 'unauthorized' });
    }
  } else {
    res.status(401).json({ message: 'unauthorized' });
  }
  next();
}

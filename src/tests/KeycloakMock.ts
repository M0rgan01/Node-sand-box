import sinon from 'sinon';
import { getKeycloak } from '../security/keycloak';
import { NextFunction, Request, Response } from 'express';

export const mock = sinon.stub(getKeycloak(), 'protect').callsFake(() => {
  return (req: Request, res: Response, next: NextFunction) => {
    next();
  };
});

// ======================== Import Packages ================================
import { getNamespace, createNamespace } from 'continuation-local-storage';
import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
// =========================================================================
const nameSpaceWriter = createNamespace('dbConnections');
const nameSpaceReader = getNamespace('dbConnections');
let tenantConnectionMap;
let adminConnection: any;

const setTenant = (tenantDbConnection?: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      let tenant = _.get(req, 'headers.slug', _.get(req, 'subdomains.0', 'wf'));
      if (!tenant) {
        return false;
      }
      if (!tenantDbConnection) {
        tenantDbConnection = 'Test Tenant';
      }
      nameSpaceWriter.run(() => {
        nameSpaceWriter.set(tenant as string, tenantDbConnection);
        next();
      });
      next();
    } catch (err) {
      console.log('Err', err);
      next(err);
    }
  };
};

const setAdmin = (req: Request, res: Response, next: NextFunction) => {
  nameSpaceWriter.run(() => {
    const adminDbConnection = 'Test Admin';
    console.log('setAdminDb adminDbConnection');
    nameSpaceWriter.set('admin', adminDbConnection);
    next();
  });
};

export { setTenant, setAdmin };

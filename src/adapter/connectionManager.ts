import { getNamespace, createNamespace } from "continuation-local-storage";
import * as _ from "lodash";
const nameSpaceWriter = createNamespace('dbConnections');
const nameSpaceReader = getNamespace('dbConnections');
let tenantConnectionMap;
let adminConnection: any;

const setTenant = (req, res, next, tenantDbConnection?) => {
    let tenant = _.get(req, 'headers.slug', _.get(req, 'subdomains.0',  'wf'));
    if (!tenant) {
      return false;
    }
    if(!tenantDbConnection) {
        tenantDbConnection = 'Test Tenant';
    }
    nameSpaceWriter.run(() => {
        nameSpaceWriter.set(tenant, tenantDbConnection);
        next();
    });
};

const setAdmin = (req, res,next) => {
    nameSpaceWriter.run(() => {
        const adminDbConnection = 'Test Admin';
        console.log("setAdminDb adminDbConnection");
        nameSpaceWriter.set('admin', adminDbConnection);
        next();
    });
};


export { setTenant, setAdmin }
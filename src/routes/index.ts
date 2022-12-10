import express from 'express';
// import * as _ from 'lodash';
// import { tenantRoutes, adminRoutes } from './route';

// export const routes = (app: express.Application) => {
//   //Wrap Tenants and admin APIs
//   const apiRoutes = express.Router({ mergeParams: true });
//   //Set db connection in following process based on tenant request
//   apiRoutes.use('/tenant', tenantRoutes);
//   apiRoutes.use('/admin', adminRoutes);
//   apiRoutes.use((req, res, next) => {
//     if (!req.route) {
//       const error = new Error('No route matched');
//       return next(error);
//     }
//     next();
//   });
//   app.use('/api', apiRoutes);
// };

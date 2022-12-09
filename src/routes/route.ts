import { Router } from 'express';
import { setAdmin, setTenant } from '../adapter/connectionManager';

const tenantRoutes = Router({ mergeParams: true });
const adminRoutes = Router();

tenantRoutes.use(setTenant());
adminRoutes.use(setAdmin);

// Admin Routes
adminRoutes.get('/example', (_, res) => {
  return res.json({ message: 'HELLO' });
});

// Tenant Routes
tenantRoutes.use('/example', (_, res) => {
  return res.json({ message: 'HELLO' });
});

export { tenantRoutes, adminRoutes };

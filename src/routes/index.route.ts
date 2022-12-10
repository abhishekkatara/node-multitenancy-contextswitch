// ============== Import Packages =========
import { Router } from 'express';
// ========================================
import { Route } from '@/interfaces/route.interface';
import AdminRoute from './admin/index.route';
import TenantRoute from './tenant/index.route';

export default class ApiRoute implements Route {
  readonly path = '/api';
  readonly router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private readonly initializeRoutes = () => {
    const adminRoutes = new AdminRoute();
    const tenantRoutes = new TenantRoute();
    this.router.use(`${this.path}`, adminRoutes.router);
    this.router.use(`${this.path}`, tenantRoutes.router);
  };
}

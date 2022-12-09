import express from 'express';

const tenantRoutes = express.Router();
const adminRoutes = express.Router();

// Admin Routes
adminRoutes.use("/example", ()=> { return 1 });


// Tenant Routes
tenantRoutes.use("/example", ()=> { return 1 });

export  { tenantRoutes, adminRoutes }
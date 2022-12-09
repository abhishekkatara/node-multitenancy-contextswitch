import express, { Express } from "express";
import * as  _ from "lodash";
import { setAdmin, setTenant } from "../adapter/connectionManager";
import { tenantRoutes, adminRoutes }  from "./route"
export const routes = async (app: Express) => {
	//Set db connection in following process based on tenant request
	tenantRoutes.use(setTenant);
	adminRoutes.use(setAdmin);

	//Wrap Tenants and admin APIs
	const apiRoutes = express.Router();
	app.use('/api', apiRoutes);

	apiRoutes.use("/tenant", tenantRoutes);
	apiRoutes.use("/admin", adminRoutes);
	apiRoutes.use((req, res, next) => {
		if (!req.route) {
		  const error = new Error("No route matched");
		  return next(error);
		}
		next();
	});
};
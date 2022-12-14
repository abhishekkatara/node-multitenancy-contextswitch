// ========== Import Packages ==============
import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import compression from 'compression';
import xss from 'xss-clean';
import { Server, IncomingMessage, ServerResponse } from 'http';
// ==========================================
import { NODE_ENV, PORT } from '@/config';
import { Route } from '@interfaces/route.interface';

export default class App {
  public server?: Server<typeof IncomingMessage, typeof ServerResponse>;
  private readonly app: express.Application;
  private readonly port: number;
  private readonly env: string;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = (PORT && +PORT) || 3000;
    this.env = NODE_ENV || 'development';
    this.setMiddlewares();
    this.initializeRoutes(routes);
  }

  private readonly setMiddlewares = () => {
    this.app.set('view engine', 'hbs');
    this.app.set('views', path.resolve(process.cwd(), 'src/templates'));
    this.app.use(express.static(path.resolve(process.cwd(), 'public')));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(hpp());
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(xss());
    this.app.use(cookieParser());
  };

  private readonly initializeRoutes = (routes: Route[]) => {
    routes.map((route) => {
      this.app.use('/', route.router);
    });
  };

  public readonly listen = () => {
    this.server = this.app.listen(this.port, () => {
      process.stdout.write(`================================= \n`);
      process.stdout.write(`======= ENV: ${this.env} ======== \n`);
      process.stdout.write(`🚀 App listening on the port ${this.port} \n`);
      process.stdout.write(`================================= \n`);
    });
  };
}

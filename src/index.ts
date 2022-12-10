import App from './app';
import ApiRoute from './routes/api-v1/index.route';

const app = new App([new ApiRoute()]);

app.listen();

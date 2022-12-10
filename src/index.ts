import App from './app';
import ApiRoute from '@routes/index.route';

const app = new App([new ApiRoute()]);

app.listen();

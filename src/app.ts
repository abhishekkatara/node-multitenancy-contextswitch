import express from 'express';
import morgan from 'morgan';
import { routes } from './routes';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(morgan('dev'));

routes(app);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

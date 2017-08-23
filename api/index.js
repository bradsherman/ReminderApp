import express from 'express';
import bodyParser from 'body-parser';

import { Db } from './db';
import apiRoutes from './routes';

Db.connect();

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api', apiRoutes(app, express));

app.listen(PORT);

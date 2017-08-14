import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import { Db, Models } from './db';
import apiRoutes from './routes';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

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

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: { Models } }));
app.use('/api', apiRoutes(app, express));

app.listen(PORT);

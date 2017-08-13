import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import { Db, Models } from './db';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = 3000;
const app = express();

Db.connect();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: { Models } }));

app.listen(PORT);

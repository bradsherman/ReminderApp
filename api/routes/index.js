import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import { Models } from '../db/';
import typeDefs from '../graphql/schema';
import resolvers from '../graphql/resolvers';
import userRoutes from './users';
import groupRoutes from './groups';
import reminderRoutes from './reminders';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// TODO: move this
const secret = 'supersecretstring';

export default function (app, express) {
  const router = express.Router();

  // check to see if api is up without auth
  router.get('/', (req, res) => {
    res.json({ message: 'API is up and running!' });
  });

  router.post('/authenticate', (req, res) => {
    Models.User.findOne({
      username: req.body.username,
    }).select('name username password').exec((err, user) => {
      if (err) throw err;

      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.',
        });
      } else if (user) {
        const validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.',
          });
        } else {
          const token = jwt.sign({
            name: user.name,
            username: user.username,
          }, secret, {
            expiresIn: 86400,
          });

          res.json({
            success: true,
            message: 'User authenticated.',
            token,
          });
        }
      }
    });
  });

  // check to make sure all requests after this point are authenticated
  // router.use((req, res, next) => {
  //   const token = req.body.token || req.query.token || req.headers['x-access-token'];

  //   if (token) {
  //     jwt.verify(token, secret, (err, decoded) => {
  //       if (err) {
  //         return res.status(403).send({
  //           success: false,
  //           message: 'Failed to authenticate token',
  //         });
  //       }
  //       req.decoded = decoded;
  //       next();
  //     });
  //   } else {
  //     return res.status(403).send({
  //       success: false,
  //       message: 'No token provided.',
  //     });
  //   }
  // });

  // graphql endpoint, must be authenticated
  router.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: { Models } }));

  // users endpoints
  router.use('/user', userRoutes(app, express));

  // group endpoints
  router.use('/group', groupRoutes(app, express));

  // reminders endpoints
  router.use('/reminder', reminderRoutes(app, express));


  return router;
}

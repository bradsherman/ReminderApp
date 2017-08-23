import { Models } from '../db';

export default function (app, express) {
  const router = express.Router();

  router.post('/', (req, res) => {
    const user = new Models.User();
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;

    user.save((err) => {
      if (err) {
        if (err.code === 11000) {
          return res.json({ success: false, message: 'Username exists.' });
        }
        return res.send(err);
      }
      res.json({ success: true, message: 'User created!' });
    });
  });

  router.get('/', (req, res) => {
    Models.User.find((err, users) => {
      if (err) res.send(err);
      res.json(users);
    });
  });

  router.get('/:user_id', (req, res) => {
    Models.User.findById(req.params.user_id, (err, user) => {
      if (err) res.send(err);
      res.json(user);
    });
  });

  router.put('/:user_id', (req, res) => {
    Models.User.findById(req.params.user_id, (err, user) => {
      if (err) res.send(err);

      const u = user;

      if (req.body.name) u.name = req.body.name;
      if (req.body.uname) u.uname = req.body.uname;
      if (req.body.password) u.password = req.body.password;

      u.save((error) => {
        if (err) res.send(error);
        res.json({ message: 'User updated.' });
      });
    });
  });

  router.delete('/:user_id', (req, res) => {
    Models.User.remove({
      _id: req.params.user_id,
    }, (err) => {
      if (err) return res.send(err);
      res.json({ message: 'User deleted.' });
    });
  });

  return router;
}

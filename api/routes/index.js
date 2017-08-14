import { Models } from '../db/';

export default function (app, express) {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json({ message: 'API is up and running!' });
  });

  // create reminder
  router.post('/reminder', (req, res) => {
    const reminder = new Models.Reminder();
    reminder.description = req.body.description;
    reminder.author = req.body.author;

    reminder.save((err) => {
      if (err) {
        res.send(err);
      }
      res.json({ result: 'Reminder created!' });
    });
  });

  // get reminder
  router.get('/reminder/:reminderid', (req, res) => {
    Models.Reminder.findById(req.params.reminderid, (err, reminder) => {
      if (err) res.send(err);
      res.json(reminder);
    });
  });

  // list reminders
  router.get('/reminder', (req, res) => {
    Models.Reminder.find({}, (err, reminders) => {
      if (err) res.send(err);
      res.json(reminders);
    });
  });

  // delete reminders
  router.delete('/reminder/:reminderid', (req, res) => {
    Models.Reminder.remove({ _id: req.params.reminderid }, (err) => {
      if (err) res.send(err);
      res.json({ message: 'Reminder deleted.' });
    });
  });

  return router;
}

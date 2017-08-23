import { Models } from '../db';

export default function (app, express) {
  const router = express.Router();

  // create reminder
  router.post('/', (req, res) => {
    const reminder = new Models.Reminder();
    reminder.description = req.body.description;
    console.log(req.decoded);
    reminder.author = req.decoded.name;
    // reminder.author = req.body.author;
    reminder.isComplete = false;

    reminder.save((err) => {
      if (err) {
        res.send(err);
      }
      res.json({ result: 'Reminder created!' });
    });
  });

  // get reminder
  router.get('/:reminderid', (req, res) => {
    Models.Reminder.findById(req.params.reminderid, (err, reminder) => {
      if (err) res.send(err);
      res.json(reminder);
    });
  });

  // list reminders
  router.get('/', (req, res) => {
    Models.Reminder.find({}, (err, reminders) => {
      if (err) res.send(err);
      res.json(reminders);
    });
  });

  // delete reminders
  router.delete('/:reminderid', (req, res) => {
    Models.Reminder.remove({ _id: req.params.reminderid }, (err) => {
      if (err) res.send(err);
      res.json({ message: 'Reminder deleted.' });
    });
  });

  return router;
}

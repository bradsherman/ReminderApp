import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReminderSchema = new Schema({
  description: { type: String, required: true },
  author: String,
});

const Reminder = mongoose.model('Reminder', ReminderSchema);

export default Reminder;

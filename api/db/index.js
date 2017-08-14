import mongoose from 'mongoose';
import config from 'config';

import Reminder from './models/reminder';
import User from './models/user';

export const Db = {
  connect() {
    return mongoose.connect(config.dbConnection);
  },
};

export const Models = {
  Reminder,
  User,
};

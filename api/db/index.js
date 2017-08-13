import mongoose from 'mongoose';
import config from 'config';

import Todo from './models/todo';

export const Db = {
  connect() {
    return mongoose.connect(config.dbConnection);
  },
};

export const Models = {
  Todo,
};

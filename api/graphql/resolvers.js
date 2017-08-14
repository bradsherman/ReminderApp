export default {
  Query: {
    allReminders: async (parent, args, { Models }) => {
      const reminders = await Models.Reminder.find();
      return reminders.map((x) => {
        x._id = x._id.toString();
      });
    },
  },
  Mutation: {
    createReminder: async (parent, args, { Models }) => {
      const reminder = await new Models.Reminder(args).save();
      reminder._id = reminder._id.toString();
      return reminder;
    },
  },
};

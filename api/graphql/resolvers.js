export default {
  Query: {
    allTodos: async (parent, args, { Models }) => {
      const todos = await Models.Todo.find();
      return todos.map((x) => {
        x._id = x._id.toString();
      });
    },
  },
  Mutation: {
    createTodo: async (parent, args, { Models }) => {
      const todo = await new Models.Todo(args).save();
      todo._id = todo._id.toString();
      return todo;
    },
  },
};

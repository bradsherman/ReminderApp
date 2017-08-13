export default {
  Query: {
    allTodos: async (parent, args, { Todo }) => {
      const todos = await Todo.find();
      return todos.map((x) => {
        x._id = x._id.toString();
      });
    },
  },
  Mutation: {
    createTodo: async (parent, args, { Todo }) => {
      const todo = await new Todo(args).save();
      todo._id = todo._id.toString();
      return todo;
    },
  },
};

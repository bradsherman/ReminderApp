export default `

type Todo {
  _id: String!
  description: String!
}

type Query {
  allTodos: [Todo!]!
}

type Mutation {
  createTodo(description: String!): Todo!
}

`;

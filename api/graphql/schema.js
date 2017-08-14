export default `

type Reminder {
  _id: String!
  description: String!
  author: String!
}

type Query {
  allReminders: [Reminder!]!
}

type Mutation {
  createReminder(description: String!): Reminder!
}

`;

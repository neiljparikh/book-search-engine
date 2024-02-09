const typeDefs = `
  type Book {
    authors: [String]!
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!

  }

  type User {
    username: String!
    email: String!
    password: String!
    savedBooks: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    User: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): 
    createVote(_id: String!, techNum: Int!): Matchup
  }
`;

module.exports = typeDefs;

const express = require('express');
const { buildSchema, resolveObjMapThunk } = require('graphql')
const { graphqlHTTP } = require('express-graphql');
const { default: axios } = require('axios');

const app = express()

let message = 'This is a message'

const schema = buildSchema(`
  type Post {
    userId: Int
    id: Int
    title: String
    body: String
  }

  type User {
    name: String
    age: Int
    college: String
  }

  type Query {
    hello: String!
    welcomeMessage(name: String, dayOfWeek: String!): String
    getUser: User
    getUsers: [User]
    getPostsFromExternalAPI: [Post]
    message: String
  }

  input UserInput {
    name: String!
    age: Int!
    college: String!
  }

  type Mutation {
    setMessage(newMessage: String): String
    createUser(user: UserInput): User
  }
`);

// resolver
const root = {
  hello: () => {
    return `Hello World`;
  },
  welcomeMessage: (arg) => {
    return `Hey, ${args.name} hows life, today is ${arg.dayOfWeek}`;
  },
  getUser: () => {
    const user = {
      name: 'asd',
      age: 29,
      college: 'PNU'
    }
    return user
  },
  getUsers: () => {
    const users = [
      {
        name: 'asd',
        age: 29,
        college: 'PNU'
      },
      {
        name: 'asd',
        age: 29,
        college: 'PNU'
      },
    ]
    return users
  },
  getPostsFromExternalAPI: async () => {
    return axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.data)
  },
  setMessage: ({ newMessage }) => {
    message = newMessage
    return message
  },
  message: () => message,
  createUser: (arg) => {
    // create a user inside db or external api
    return arg.user
  }
};

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema,
  rootValue: root,
}));

app.listen(4000, () => console.log(`server listening on port 4000`));
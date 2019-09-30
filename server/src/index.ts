import { ApolloServer, makeExecutableSchema } from 'apollo-server'
import { importSchema } from 'graphql-import'
import * as path from 'path'
import { resolvers } from './resolvers'

const typeDefs = importSchema(path.join(__dirname, './schema.graphql'))
const schema = makeExecutableSchema({ typeDefs, resolvers } as any)

const server = new ApolloServer({ schema })

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
  .catch(err => console.error(err))

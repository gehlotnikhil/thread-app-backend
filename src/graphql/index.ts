import { ApolloServer } from "@apollo/server";
import {User} from  "./user/index"
async function createApolloGraphqlServer(){
    const gqlserver = new ApolloServer({
        typeDefs: `
            type Query{
             ${User.query}
            }
            type Mutation{
             ${User.mutation}
            }
             
        `, //Schema
        resolvers: {
          Query: {
          ...User.resolvers.queries
          },
          Mutation: {
          ...User.resolvers.mutation
          },
        }
      });
      await gqlserver.start();
      return gqlserver
}
export default  createApolloGraphqlServer
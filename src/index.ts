import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

const init = async () => {
  const app = express();
  app.use(express.json());

  const PORT = Number(process.env.PORT) | 8000;
  // Create Graphql Server 
  const gqlserver = new ApolloServer({
    typeDefs: `
        type Query{
            hello : String!
            say(name: String!):String!
        }
    `, //Schema
    resolvers: {
        Query:{
            hello:()=>"Nikhil",
            say:(parent,{name}:{name:String})=>`Hey ${name}`
        }
    }, 
  });
  await gqlserver.start();
  app.use("/graphql",expressMiddleware(gqlserver));

  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
};
init()
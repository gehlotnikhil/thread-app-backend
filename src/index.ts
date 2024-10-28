import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "./lib/db";

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
        type Mutation{
          createUser(firstName:String!,lastName: String!, email: String! , password: String!):Boolean
        }
         
    `, //Schema
    resolvers: {
        Query:{
            hello:()=>"Nikhil",
            say:(parent,{name}:{name:String})=>`Hey ${name}`
        },
        Mutation:{
          createUser:async(_,{firstName,lastName,email,password}:{firstName:string,lastName:string,email:string,password:string})=>{
            await prismaClient.user.create({
              data:{
                firstName,
                lastName,
                email,
                password,
                salt:""
              }
            });
            return true;
          }
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
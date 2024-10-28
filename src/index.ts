import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql/index";
import UserService from "./services/index";
const init = async () => {
  const app = express();
  app.use(express.json());

  const PORT = Number(process.env.PORT) | 8000;
  // Create Graphql Server
 const gqlserver = await  createApolloGraphqlServer();
  app.use("/graphql", expressMiddleware(gqlserver,
    {
      context:async({req})=>{
        try{
          console.log("1")
        const token = req.headers["token"];
        if(!token) return  {};
        console.log("f",token)

        
          const decodeToken = await UserService.decodeToken(token as string);
          console.log("s",decodeToken)
          console.log("2")
          return {decodeToken}
      }
        catch(error){
          console.log("error",error)
          return {}
        }
      }
    }
  ));

  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
};
init();

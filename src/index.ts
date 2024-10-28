import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql/index";
const init = async () => {
  const app = express();
  app.use(express.json());

  const PORT = Number(process.env.PORT) | 8000;
  // Create Graphql Server
 const gqlserver = await  createApolloGraphqlServer();
  app.use("/graphql", expressMiddleware(gqlserver));

  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
};
init();

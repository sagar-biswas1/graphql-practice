const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const port = 4000;
const schema = require("./schema/schema");
app.use(
  "/graphql",
  graphqlHTTP({
    // pass in a schema property
    schema,
    graphiql: true,
  })
);

//mega.nz/folder/U3oHVQaZ#pms-K4S0TtD4n-yGXTvqoA

redux: https: app.listen(port, () =>
  console.log(`app is running in port ${port}`)
);

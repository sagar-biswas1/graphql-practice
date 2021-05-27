const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const port = 4000;
require("dotenv").config();
const mongoose = require("mongoose");
const schema = require("./schema/schema");

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wdwpo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!

  console.log("connected to db");
});

app.use(
  "/graphql",
  graphqlHTTP({
    // pass in a schema property
    schema,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`app is running in port ${port}`));

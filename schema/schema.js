const graphql = require("graphql");
const fakeData = require("../fakeData/fakeData.json");
var _ = require("lodash");
//console.log(graphql);

const { GraphQLObjectType, GraphQLNumber, GraphQLString, GraphQLSchema } =
  graphql;

const CarType = new GraphQLObjectType({
  name: "Car",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    model: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    car: {
      type: CarType,
      args: { id: { type: GraphQLString } },
      resolve(parent, arg) {
        // code to get data from db / other source
        return _.find(fakeData, { id: arg.id });
      },
    },
  },
});
module.exports = new GraphQLSchema({ query: RootQuery });

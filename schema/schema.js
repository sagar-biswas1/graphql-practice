const graphql = require("graphql");
const fakeData = require("../fakeData/fakeData.json");
const originData = require("../fakeData/originData.json");
var _ = require("lodash");
//console.log(graphql);

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = graphql;

const CarType = new GraphQLObjectType({
  name: "Car",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    model: { type: GraphQLString },
    origin: {
      type: OriginType,

      resolve(parent, args) {
        console.log("this is the parent", parent);
        return _.find(originData, { id: parent.country_id });
      },
    },
  }),
});

const OriginType = new GraphQLObjectType({
  name: "Origin",
  fields: () => ({
    id: { type: GraphQLID },
    country: { type: GraphQLString },
    year: { type: GraphQLInt },
    cars: {
      type: new GraphQLList(CarType),

      resolve(parent, args) {
        console.log("this is the parent", parent);
        return _.filter(fakeData, { country_id: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    car: {
      type: CarType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(fakeData, { id: args.id });
      },
    },
    origin: {
      type: OriginType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(originData, { id: args.id });
      },
    },

    allCar: {
      type: new GraphQLList(CarType),

      resolve(parent, args) {
        return fakeData;
      },
    },
    countries: {
      type: new GraphQLList(OriginType),
      resolve(parent, args) {
        return originData;
      },
    },
  },
});
module.exports = new GraphQLSchema({ query: RootQuery });

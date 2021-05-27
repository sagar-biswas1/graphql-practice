const graphql = require("graphql");
const fakeData = require("../fakeData/fakeData.json");
const originData = require("../fakeData/originData.json");
var _ = require("lodash");
//console.log(graphql);
const Car = require("../models/car");
const Origin = require("../models/origin");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
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
        //  return _.find(originData, { id: parent.country_id });
        return Origin.findById(parent.country_id);
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
        // return _.filter(fakeData, { country_id: parent.id });

        return Car.find({ country_id: parent.id });
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
        //return _.find(fakeData, { id: args.id });
        return Car.findById(args.id);
      },
    },
    origin: {
      type: OriginType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        // code to get data from db / other source
        // return _.find(originData, { id: args.id });
        return Origin.findById(args.id);
      },
    },

    allCar: {
      type: new GraphQLList(CarType),

      resolve(parent, args) {
        //return fakeData;
        return Car.find({});
      },
    },
    countries: {
      type: new GraphQLList(OriginType),
      resolve(parent, args) {
        //return originData;

        return Origin.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addOrigin: {
      type: OriginType,
      args: {
        country: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let origin = new Origin({
          country: args.country,
          year: args.year,
        });

        return origin.save();
      },
    },

    addCar: {
      type: CarType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        model: { type: new GraphQLNonNull(GraphQLString) },
        country_id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let car = new Car({
          name: args.name,
          model: args.model,
          country_id: args.country_id,
        });

        return car.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

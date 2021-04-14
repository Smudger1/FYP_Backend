//const { ApolloServer, gql } = require('apollo-server-lambda');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const resolvers = require('./resolvers');

const BeaconAPI = require('./datasources/beacon');
const VenueAPI = require('./datasources/venue');
const CheckInAPI = require('./datasources/checkIns');

const store = createStore();

const server = new ApolloServer({
    /*
    context: ({ event, context }) => ({
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
    }),*/
    dataSources: () => ({
        beaconAPI: new BeaconAPI({store}),
        venueAPI: new VenueAPI({store}),
        checkInAPI: new CheckInAPI({store}),
    }),
    typeDefs,
    resolvers,
    playground: {
        endpoint: "/dev/graphql"
    },
    introspection: true,
});

console.log(store);

server.listen(5000).then(() => {
    console.log(`
        Server is running!
        Listening on port 5000
        Explore at https://studio.apollographql.com/dev
    `)
});

/*
exports.graphqlHandler = server.createHandler({
    cors: {
        origin: true,
        credentials: true,
    },
});

 */
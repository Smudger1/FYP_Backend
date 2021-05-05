const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const resolvers = require('./resolvers');

const BeaconAPI = require('./datasources/beacon');
const VenueAPI = require('./datasources/venue');
const CheckInAPI = require('./datasources/checkIns');

const store = createStore();

const server = new ApolloServer({
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


server.listen(5000).then(() => {
    console.log(`
        Server is running!
        Listening on port 5000
        Explore at http://localhost:5000/
    `)
});

const { GraphQLScalarType, Kind } = require('graphql');

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});

module.exports = {
    Date: dateScalar,

    Query: {
        verifyBeacons: async (_, { id }, {dataSources}) => {
            console.log(id)
            const results = await dataSources.beaconAPI.verifyBeacons({ id });

            return results;
        },
        checkInsByUser: async (_, { user }, {dataSources}) => {
            const results = await dataSources.checkInAPI.getCheckInByUser({ user });

            return results;
        },
    },
    Mutation: {
        createNewCheckIn: async (_, { beacon, user}, {dataSources}) => {
            const result = await dataSources.checkInAPI.createNewCheckIn({ beaconAddr: beacon, user });
            console.log(result)
            return {
                success: result,
                message:
                    result
                        ? 'Successfully Checked In'
                        : `Check In Failed`,
            };
        },
        updateCheckOut: async (_, {id}, {dataSources}) => {
            const result = await dataSources.checkInAPI.updateCheckOut({id});

            console.log(result)

            return{
                success: result,
                message:
                    result
                        ? 'Successfully Checked In'
                        : `Check In Failed`,
            };
        },
    },
    Beacon: {
        venue: async (beacon, _, {dataSources}) => {
            const results = await dataSources.venueAPI.getVenueById({ id: beacon.venueId });

            return results;
        }
    },
    CheckIn: {
        beacon: async (checkIn, _, {dataSources}) => {
            const results = await dataSources.beaconAPI.getBeaconById({ beaconAddr: checkIn.beaconAddr });

            return results;
        }
    }
}

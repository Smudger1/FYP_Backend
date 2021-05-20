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
            const results = await dataSources.beaconAPI.verifyBeacons({ id });

            return results;
        },
        checkInsByUser: async (_, { user }, {dataSources}) => {
            const results = await dataSources.checkInAPI.getCheckInByUser({ user });

            return results;
        },
        allVenueCheckIns: async (_, { venueId }, {dataSources}) => {
            const beacons = await dataSources.venueAPI.getVenueBeacons({venueId});

            const results = await dataSources.checkInAPI.getAllVenueCheckIns({beacons});

            return results;
        },
        currentVenueCount: async (_, { venueId }, {dataSources}) => {
            const beacons = await dataSources.venueAPI.getVenueBeacons({venueId});

            const count = await dataSources.checkInAPI.getCurrentVenueCount({beacons});

            return {count};
        },
        venue: async (_, { id }, {dataSources}) => {
            const venue = await dataSources.venueAPI.getVenueById({id});

            return venue;
        }
    },
    Mutation: {
        createNewCheckIn: async (_, {beacon, user}, {dataSources}) => {
            const result = await dataSources.checkInAPI.createNewCheckIn({beaconAddr: beacon, user });
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

            return{
                success: result,
                message:
                    result
                        ? 'Successfully Checked Out'
                        : `Check Out Failed`,
            };
        },
        updateVenueDetails: async (_, {id, venueName, venueAddr1, venueAddr2, venuePostcode, venueOpen, venueClose}, {dataSources}) => {
            const result = await dataSources.venueAPI.updateVenueDetails({id, venueName, venueAddr1, venueAddr2, venuePostcode, venueOpen, venueClose});

            return{
                success: result,
                message:
                    result
                        ? 'Successfully Updated'
                        : `Update Failed`,
            }
        }
    },
    CheckIn: {
        beacon: async (checkIn, _, {dataSources}) => {
            const results = await dataSources.beaconAPI.getBeaconById({ beaconAddr: checkIn.beaconAddr });

            return results;
        },
    }
}

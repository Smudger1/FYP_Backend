const {gql} = require('apollo-server');

const typeDefs = gql `
    scalar Date

    type Beacon {
      beaconAddr: ID!
      venue: Venue!
    }

    type Venue {
      id: ID!
      venueName: String!
    }

    type CheckIn {
      id: ID!
      beacon: Beacon!
      user: String!
      dateIn: Date!
      dateOut: Date
    }

    type Query {
      verifyBeacons(id: [ID]!): [Beacon]
      checkInsByUser(user: String!): [CheckIn]
      allVenueCheckIns(venueId: ID!): [CheckIn]
      currentVenueCount(venueId: ID!): VenueCountResponse!
    }

    type Mutation {
      createNewCheckIn(beacon: ID!, user: String!): CheckInMutationResponse!
      updateCheckOut(id: ID!): CheckInMutationResponse!
    }

    type CheckInMutationResponse {
      success: Boolean!
      message: String
    }
    
    type VenueCountResponse{
        count: Int
    }
`;

module.exports = typeDefs;

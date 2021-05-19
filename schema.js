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
      venueAddr1: String!
      venueAddr2: String!
      venuePostcode: String!
      venueOpen: String!
      venueClose: String!  
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
      venue(id: ID!): Venue  
    }

    type Mutation {
      createNewCheckIn(beacon: ID!, user: String!): MutationResponse!
      updateCheckOut(id: ID!): MutationResponse!
      updateVenueDetails(id:ID!, venueName: String!, venueAddr1: String!, venueAddr2: String, venuePostcode: String!, venueOpen: String!, venueClose: String!): MutationResponse!  
    }

    type MutationResponse {
      success: Boolean!
      message: String
    }
    
    type VenueCountResponse{
        count: Int
    }
`;

module.exports = typeDefs;

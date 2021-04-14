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
      venue(id: [ID]!): Venue
      checkInsByUser(user: String!): [CheckIn]
    }
    
    type Mutation {
      createNewCheckIn(beacon: ID!, user: String!): CheckInMutationResponse!
      updateCheckOut(id: ID!): CheckInMutationResponse!
    }
    
    type CheckInMutationResponse {
      success: Boolean!
      message: String
    }
`;

module.exports = typeDefs;

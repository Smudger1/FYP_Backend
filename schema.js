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
      dateIn: Date!
      dateOut: Date
    }
    
    type Query {
      verifyBeacons(id: [ID]!): [Beacon]
      venue(id: [ID]!): Venue
    }
    
    # type Mutation {
      # bookTrips(launchIds: [ID]!): TripUpdateResponse!
      # cancelTrip(launchId: ID!): TripUpdateResponse!
      # login(email: String): User
    # }
`;

module.exports = typeDefs;

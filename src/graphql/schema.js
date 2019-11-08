import { gql } from 'apollo-server-koa';

const typeDefs = gql`
  type Query {
    games: [Game]!
    game(id: ID!): Game
    streams(first: Int! after: String!): StreamConnection!
  }

  type StreamConnection {
    cursor: String!
    hasMore: Boolean!
    streams: [Stream]!
  }

  type Game {
    id: ID!
    name: String!
    boxArtUrl: String!
  }

  type Stream {
    id: ID!,
    title: String!,
    viewerCount: Int!,
    language: String!,
    thumbnailUrl: String!,
    user: User!
  }

  type User {
    id: ID!
    username: String!
    name: String!
    biography: String!
    profileImageUrl: String!
  }
`;

export default typeDefs;

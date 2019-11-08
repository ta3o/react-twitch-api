const resolvers = {
  Query: {
    games: (_, __, { dataSources }) => dataSources.gameAPI.getTopGames(),
    game: (_, { id }, { dataSources }) => dataSources.gameAPI.getGameById({ gameId: id }),
    streams: (_, { first, after }, { dataSources }) => dataSources
      .streamAPI.getAllStreams({ first, after }),
  },

  Stream: {
    user: ({ userId }, __, { dataSources }) => dataSources.streamAPI.getUserById({ userId }),
  },
};

export default resolvers;

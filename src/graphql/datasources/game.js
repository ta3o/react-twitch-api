/* eslint-disable class-methods-use-this */
import { RESTDataSource } from 'apollo-datasource-rest';

class GameAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.twitch.tv/helix/';
  }

  willSendRequest(request) {
    request.headers.set('Client-ID', 'wj6248liq99xdl2u8n9hp9a8wejhbc');
  }

  async getTopGames() {
    const response = await this.get('games/top');
    return Array.isArray(response.data)
      ? response.data.map((game) => this.gameReducer(game))
      : [];
  }

  async getGameById({ gameId }) {
    const response = await this.get('games', { id: gameId });
    return this.gameReducer(response.data[0]);
  }

  getGamesByIds({ gameIds }) {
    return Promise.all(
      gameIds.map((gameId) => this.getGameById({ gameId })),
    );
  }

  gameReducer(game) {
    return {
      id: game.id,
      name: game.name,
      boxArtUrl: game.box_art_url,
    };
  }
}

export default GameAPI;

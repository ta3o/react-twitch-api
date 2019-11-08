/* eslint-disable class-methods-use-this */
import { RESTDataSource } from 'apollo-datasource-rest';
import { runtimeConfig } from '../../../config';

class StreamAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.twitch.tv/helix/';
  }

  willSendRequest(request) {
    request.headers.set('Client-ID', runtimeConfig.twitchClientId);
  }

  async getAllStreams({ first, after }) {
    const response = await this.get('streams', { first, after });
    return {
      streams: Array.isArray(response.data)
        ? response.data.map((stream) => this.streamReducer(stream))
        : [],
      cursor: response.pagination.cursor,
      hasMore: response.data.length > 0 || false,
    };
  }

  // async getAllStreams() {
  //   const response = await this.get('streams');
  //   return Array.isArray(response.data)
  //     ? response.data.map((stream) => this.streamReducer(stream))
  //     : [];
  // }

  async getUserById({ userId }) {
    const response = await this.get('users', { id: userId });
    return this.userReducer(response.data[0]);
  }

  streamReducer(stream) {
    return {
      id: stream.id,
      userId: stream.user_id,
      title: stream.title,
      viewerCount: stream.viewer_count,
      language: stream.language,
      thumbnailUrl: stream.thumbnail_url,
    };
  }

  userReducer(user) {
    return {
      id: user.id,
      username: user.login,
      name: user.display_name,
      biography: user.description,
      profileImageUrl: user.profile_image_url,
    };
  }
}

export default StreamAPI;

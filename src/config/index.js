const runtimeConfig = typeof window !== 'undefined'
  ? {
    // client
    twitchClientId: window.env.twitchClientId,
  }
  : {
    // server
    twitchClientId: process.env.RAZZLE_TWITCH_CLIENT_ID,
  };

export { runtimeConfig };

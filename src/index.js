/* eslint-disable global-require */
/* eslint-disable no-console */
import http from 'http';

const app = require('./server').default;

let currentHandler = app.callback();
const server = http.createServer(currentHandler);

server.listen(process.env.PORT || 3000, (error) => {
  if (error) {
    console.log(error);
  }

  console.log('🚀 started PORT:', process.env.PORT || 3000);
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      const newHandler = require('./server').default.callback();
      server.removeListener('request', currentHandler);
      server.on('request', newHandler);
      currentHandler = newHandler;
    } catch (error) {
      console.error(error);
    }
  });
}

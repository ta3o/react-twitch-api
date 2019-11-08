import routes from './routes';
import typeDefs from '../graphql/schema';
import resolvers from '../graphql/resolvers';
import GameAPI from '../graphql/datasources/game';
import StreamAPI from '../graphql/datasources/twitchAPI/stream';

const Koa = require('koa');
const Router = require('koa-router');
const { ApolloServer } = require('apollo-server-koa');
const helmet = require('koa-helmet');
const logger = require('koa-logger');
const serve = require('koa-static');

const app = new Koa();
const router = new Router();

// router.get('/', async (ctx, next) => {
//   ctx.body = 'Hello World!';
// });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    gameAPI: new GameAPI(),
    streamAPI: new StreamAPI(),
  }),
});

routes({ router });

app.use(helmet());
app.use(logger());
app.use(serve(process.env.RAZZLE_PUBLIC_DIR));
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});
app.use(server.getMiddleware({ path: '/api' }));
app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err, ctx) => {
  console.log(err);
});

export default app;

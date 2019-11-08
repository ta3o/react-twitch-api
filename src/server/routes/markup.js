/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import fetch from 'node-fetch';
import serialize from 'serialize-javascript';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-common';
import { getDataFromTree } from '@apollo/react-ssr';
import { SchemaLink } from 'apollo-link-schema';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';
import { runtimeConfig } from '../../config';
import App from '../../App';
import schema from '../../graphql/schema';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const pageLang = process.env.RAZZLE_PAGE_LANG;
const pageTitle = process.env.RAZZLE_PAGE_TITLE;

export const getMarkup = async (ctx, next) => {
  const context = {};
  const sheet = new ServerStyleSheet();
  const client = await new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'http://localhost:3000/api',
      fetch: fetch,
    }),
    // link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
  });

  const Main = (
    <ApolloProvider client={client}>
      <StaticRouter context={context} location={ctx.url}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  );

  await getDataFromTree(Main);

  const markup = renderToString(sheet.collectStyles(
    Main,
  ));

  const initialState = client.extract();
  const styleTags = sheet.getStyleTags();
  sheet.seal();
  ctx.state.markup = markup;
  ctx.state.css = styleTags;
  ctx.state.initialState = initialState;
  return context.url ? ctx.redirect(context.url) : next();
};

export const renderMarkup = (ctx) => {
  const razzleStyles = assets.client.css
    ? `<link rel="stylesheet" href="${assets.client.css}">`
    : '';
  const styledComponentsStyles = ctx.state.css;
  const razzleScripts = process.env.NODE_ENV === 'production'
    ? `<script src="${assets.client.js}" defer></script>`
    : `<script src="${assets.client.js}" defer crossorigin></script>`;
  ctx.status = 200;
  ctx.body = `
    <!doctype html>
      <html lang="${pageLang}">
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>${pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${razzleStyles}
        ${styledComponentsStyles}
        ${razzleScripts}
        <script src="https://player.twitch.tv/js/embed/v1.js"></script>
      </head>
      <body>
        <div id="root">${ctx.state.markup}</div>
        <script>window.env = ${serialize(runtimeConfig)};</script>
        <script>window.__APOLLO_STATE__ = ${serialize(ctx.state.initialState)};</script>
      </body>
    </html>
  `;
};

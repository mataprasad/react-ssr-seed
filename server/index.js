import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter,BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import App from '../src/App';

const PORT = process.env.PORT || 3007;
const app = express();

app.get('/', (req, res) => {
  return ssr(req, res, true);
});

app.get('/index.html', (req, res) => {
  return ssr(req, res, true);
});

app.use(express.static('./build'));

app.get('/*', (req, res) => {
  return ssr(req, res, false);
});
 
app.listen(PORT,'127.0.0.1', () => {
  console.log(`Server is listening on port ${PORT}`);
});

function ssr(req, res, isIndex = true){
  const context = {};
  let loc = '/';
  if(!isIndex){
    loc = req.url;
  }
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={loc} context={context}>
      <App />
    </StaticRouter>
  );
  const helmet = Helmet.renderStatic();
  //console.log('helmet',helmet);
  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    data = data.replace(/\$OG_TITLE/g, helmet.title.toString());
    data = data.replace(/\$OG_META/g, helmet.meta.toString());
    data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)

    return res.send(
      data
    );
  });
}

function formatHTML(appStr, helmet) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">
        ${ appStr }
        </div>
      </body>
    </html>
  `;
}
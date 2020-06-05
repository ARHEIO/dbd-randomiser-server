/* eslint-disable @typescript-eslint/no-var-requires */
const http = require('http');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const app = express();

// view engine setup
app.set('port', process.env.PORT || 9002);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('/*', (req, res, next) => {
  res.set('Content-Type', 'application/json');
  // Allow CORS requests on stub.
  res.set('Access-Control-Allow-Origin', req.headers.origin);
  res.set('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,accept,api-key');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH');
  res.set('X-Request-URL', req.url);
  next();
});

app.get('/ping', async (req, res) => {
  res.status(200).send('pong');
})

const BASE_PATH = `/dbd-randomiser`;
const LAMBDA_PATH = 'http://dbd-server:9001/2015-03-31/functions/-/invocations';

// handles all paths with one path param
app.all(`${BASE_PATH}/*`, (req, res, next) => {
  console.debug('Adding generic params');
  res.locals.lambdaBody = {
    httpMethod: req.method,
    queryStringParameters: req.query,
    path: `/${req.path.split('/')[2]}`
  }
  next();
})

// to handle paths with multiple path params
require('./routes')(app, BASE_PATH);

app.all(`${BASE_PATH}/*`, async(req, res) => {
  console.log('Request:', JSON.stringify(res.locals.lambdaBody));
  axios.post(LAMBDA_PATH, res.locals.lambdaBody).then(response => {
    res.status = response.data.statusCode;
    res.headers = response.data.headers;
    res.send(response.data.body);
  })
});

http.createServer(app).listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});

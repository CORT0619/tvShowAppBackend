const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const firebase = require('firebase');
require('dotenv').config();

// setup cookie parser
app.use(cookieParser());

// setup body parser
app.use(bodyParser.json()); // parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET'
    );
    return res.status(200).json({});
  }
  next();
});

const port = process.env.PORT || 3000;

// firebase config
const config = {
  apiKey: process.env.firebaseApiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  storageBucket: process.env.storageBucket
};

/* const firebaseConf = */firebase.initializeApp(config);
// console.log('firebaseConf ', firebaseConf);

// import routes
const routes = require('./app');
app.use(routes);

app.listen(port, () => {
  console.log('Listening on PORT %d', port);
});

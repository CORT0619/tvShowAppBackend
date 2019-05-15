const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const winston = require('winston');

const firebase = require('firebase');
require('dotenv').config();

// setup cookie parser
app.use(cookieParser());

// setup body parser
app.use(bodyParser.json()); // parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // parsing application/x-www-form-urlencoded

// setup winston - logging
const logConfiguration = {
  'transports': [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: './logs/error-log.log'
    })
  ]
};

const logger = winston.createLogger(logConfiguration); // create the logger

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

// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ error: err });
// });

// import routes
const routes = require('./routes/routes');
app.use(routes);

// app.on uncaught exception
if (process.env.NODE_ENV === 'development') {
  app.use(logErrors);
}

if (process.env.NODE_ENV === 'production') {
  app.use();
}

// handle errors
app.use(handleErrors);

process.on('unhandledRejection', (err) => {
  console.log('error ', err);
});

app.listen(port, () => {
  console.log('Listening on PORT %d', port);
});


/* Error handing functions */
/**
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function logErrors(err, req, res, next) {
  logger.log({ // log the message
    message: err,
    level: 'error'
  });
  console.error(err.stack);
  next(err);
}

function handleErrors(err, req, res) {
  console.log('error ', err);
  res.status(500);
}

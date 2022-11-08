const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const winston = require('winston');
const { format } = require('winston');

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
  level: 'info',
  // format: winston.format.json(),
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'MM-DD-YYYY HH:mm:ss'
    }),
    winston.format.colorize(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: './logs/error-log.log',level: 'error' }),
    new winston.transports.File({ filename: './logs/all-logs.log' })
  ]
};

const logger = winston.createLogger(logConfiguration); // create the logger

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

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

// import routes
const routes = require('./routes/routes');
app.use('/api', routes);
app.all('*', (req, res) => res.status(404).send('The request was malformed.'));

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

function logErrors(req, res, next) {
  logger.log({ // log the message
    message: '',
    level: 'error'
  });
  console.error(/*err.stack*/);
  next(/*err*/);
}

/**
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 */
function handleErrors(req, res, next) {
  // console.log('error ', err);
  res.status(500).send('an error has occurred');
}

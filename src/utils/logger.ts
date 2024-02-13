import winston, { format } from 'winston';

const logConfig = {
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
    new winston.transports.File({ 
      filename: './logs/error-log.log',
      level: 'error' 
    }),
    new winston.transports.File({ filename: './logs/all-logs.log' })
  ]
};

const logger = winston.createLogger(logConfig);

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;
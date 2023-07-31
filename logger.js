const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  transports: [
    new transports.File({ filename: 'logs/buy-book.log'}),
    // new winston.transports.Console({ level: 'debug' })
  ],
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
});

module.exports = logger;
const winston = require("winston");
const config = require("config");

const logger = winston.createLogger({
  transports: [new winston.transports.Console(config.logger.console)],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
});

module.exports = logger;

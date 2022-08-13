global.__basedir = __dirname; // TODO REVIEW

const config = require("config");
const logger = require("./logger");
const Beep = require("./lib/beep");

const beep = new Beep(config, logger);

module.exports = beep;

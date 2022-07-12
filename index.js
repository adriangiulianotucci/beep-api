const config = require("config");
const logger = require("./logger");
const Bar = require("./lib/bar");

const bar = new Bar(config, logger);

module.exports = bar;

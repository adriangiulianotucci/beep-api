const fs = require("fs");
const path = require("path");
const config = require("config");

const publicKey =
  process.env.BAR_PUB || fs.readFileSync(`.././${config.auth.key}.pub`);

module.exports = publicKey;

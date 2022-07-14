const fs = require("fs");
const path = require("path");
const config = require("config");

const publicKey =
  fs.readFileSync(path.join(__dirname, `./${config.auth.key}.pub`)) ||
  process.env.BAR_PUB;

module.exports = publicKey;

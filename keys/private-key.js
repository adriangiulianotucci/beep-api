const fs = require("fs");
const path = require("path");
const config = require("config");

const privateKeyPath =
  process.env.PRIVATE_KEY_PATH || config.auth.privateKeyPath;

const privateKey = fs.readFileSync(__basedir + privateKeyPath);

module.exports = privateKey;

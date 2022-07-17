const fs = require("fs");
const path = require("path");
const config = require("config");

const publicKey =
  process.env.BAR_PUB ||
  fs.readFileSync(path.join(process.cwd(), `./${config.auth.key}.pub`));

module.exports = publicKey;

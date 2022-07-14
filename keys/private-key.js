const fs = require("fs");
const path = require("path");
const config = require("config");

const privateKey =
  process.env.BAR_PK ||
  fs.readFileSync(path.join(__dirname, `./${config.auth.key}.pk`));

module.exports = privateKey;

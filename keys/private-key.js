const fs = require("fs");
const path = require("path");
const config = require("config");

const privateKey = fs.readFileSync(
  path.join(__dirname, `./${config.auth.key}.pk`) || process.env.BAR_PK
);

module.exports = privateKey;

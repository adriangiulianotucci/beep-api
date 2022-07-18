const fs = require("fs");
const path = require("path");
const config = require("config");

const privateKey = process.env.BAR_PK || fs.readFileSync(`.././BAR_PK`);

module.exports = privateKey;

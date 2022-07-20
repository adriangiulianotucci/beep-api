const fs = require("fs");

const publicKey = fs.readFileSync(__dirname + "/../bar.pub");

module.exports = publicKey;

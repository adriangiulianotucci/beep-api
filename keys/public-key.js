const fs = require("fs");

const publicKey = fs.readFileSync("../bar.pub");

module.exports = publicKey;

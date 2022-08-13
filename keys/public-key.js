const fs = require("fs");

const publicKey = fs.readFileSync(__dirname + "/../beep.pub");

module.exports = publicKey;

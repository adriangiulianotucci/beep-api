const fs = require("fs");

const privateKey = fs.readFileSync(__dirname + "/../beep.pk");

module.exports = privateKey;

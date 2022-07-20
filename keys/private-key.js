const fs = require("fs");

const privateKey = fs.readFileSync(__dirname + "/../bar.pk");

module.exports = privateKey;

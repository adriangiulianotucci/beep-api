const fs = require("fs");

const privateKey = fs.readFileSync("../bar.pk");

module.exports = privateKey;

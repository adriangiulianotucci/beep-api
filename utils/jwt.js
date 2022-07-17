const jwt = require("jsonwebtoken");
const privateKey = require("../keys/private-key");

async function generateToken(req, res, { user }) {
  const payload = {
    _id: user._id,
  };

  const token = jwt.sign(payload, privateKey, {
    subject: user._id.toString(),
    issuer: req.config.auth.token.issuer,
    algorithm: req.config.auth.token.algorithm,
    expiresIn: req.config.auth.token.expiresIn,
  });

  return token;
}

module.exports = generateToken;

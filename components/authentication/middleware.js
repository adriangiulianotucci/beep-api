const publicKey = require("../../keys/public-key");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

function getToken(req, next) {
  const TOKEN_REGEX = /^\s*Bearer\s+(\S+)/g;
  const matches = TOKEN_REGEX.exec(req.headers.authorization);

  if (!matches) {
    return next(new createError.Unauthorized());
  }

  return matches[1];
}

function authenticationMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    req.logger.warn("Missing authorization header");
    return next(new createError.Unauthorized());
  }

  const token = getToken(req, next);

  try {
    req.user = jwt.verify(token, publicKey, {
      issuer: req.config.auth.token.issuer,
    });

    if (!req.user._id) {
      req.logger.error("Error missing user props");
      return next(new createError.Unauthorized());
    }

    req.logger.verbose(`User ${req.user._id} authenticated`);
    next();
  } catch (error) {
    req.logger.error(error.name);
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return next(new createError.Unauthorized());
    }
  }
}

module.exports = authenticationMiddleware;

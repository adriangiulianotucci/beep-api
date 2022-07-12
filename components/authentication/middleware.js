const publicKey = require("../../keys/public-key");
const createError = require("http-errors");

function getToken(req, next) {
  const TOKEN_REGEX = /^\s*Bearer\s+(\S+)/g;
  const matches = TOKEN_REGEX.exec(req.headers.authorization);

  if (!matches) {
    return next(new createError.Unauthorized());
  }

  return matches[1];
}

function authenticationMiddleware(req, res, next) {
  console.log(req);
  if (!req.headers.authorization) {
    req.logger.warn("Missing authorization header");
    return next(new createError.Unauthorized());
  }

  const token = getToken(req, next);

  try {
    req.user = jwt.verify(token, publicKey, {
      issuer: req.config.auth.token.issuer,
    });

    if (!user || !user._id || !user.organization) {
      req.logger.error("Error authenticating malformed JWT");
      return next(new createError.Unauthorized());
    }

    req.logger.verbose(`User ${req.user._id} authenticated`);
  } catch (error) {
    req.logger.error(error);
  }
}

module.exports = authenticationMiddleware;

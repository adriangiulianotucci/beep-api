const { Router } = require("express");
const generateToken = require("../../utils/jwt");

const router = new Router();

router.post("/token", createUserToken);

async function createUserToken(req, res, next) {
  if (!req.body) {
    req.logger.verbose("Missing body. Sending 400 to client");
    return res.status(400).send();
  }

  req.logger.info(`Creating user token for ${req.body.email}`);

  if (!req.body.email) {
    req.logger.verbose("Missing email parameter. Sending 400 to client");
    return res.status(400).end();
  }

  if (!req.body.password) {
    req.logger.info("Missing password parameter. Sending 400 to client");
    return res.status(400).end();
  }

  try {
    const user = await req
      .model("User")
      .findOne({ email: req.body.email }, "+password");

    if (!user) {
      req.logger.verbose("User not found. Sending 404 to client");
      return res.status(401).end();
    }

    req.logger.verbose("Checking user password");

    const passwordCheck = await user.checkPassword(req.body.password);

    if (!passwordCheck) {
      req.logger.verbose("User password is invalid. Sending 401 to client");
      return res.status(401).end();
    }

    const token = await generateToken(req, res, { user });

    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
}

module.exports = router;

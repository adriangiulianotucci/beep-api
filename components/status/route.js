const { Router } = require("express");
const pkg = require("../../package.json");

const router = new Router();

router.get("/", getStatus);

async function getStatus(req, res, next) {
  req.logger.verbose("Getting server status");

  res.status(200).send({ name: pkg.name, version: pkg.version });
}

module.exports = router;

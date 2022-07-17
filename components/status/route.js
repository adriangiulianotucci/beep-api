const { Router } = require("express");
const pkg = require("../../package.json");

const router = new Router();

router.get("/", getStatus);
router.get("/database", getDatabaseStatus);

async function getStatus(req, res, next) {
  req.logger.verbose("Getting server status");

  res.status(200).send({ name: pkg.name, version: pkg.version });
}

async function getDatabaseStatus(req, res, next) {
  req.logger.verbose("Getting database status");

  try {
    const result = await req.pingDatabase();

    if (!result || !result.ok) {
      return res.sendStatus(503);
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

module.exports = router;

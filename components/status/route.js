const router = new Router();

router.get("/", getStatus);

async function getStatus(req, res, next) {
  req.logger.verbose("Getting server status");

  req.status(200).send();
}

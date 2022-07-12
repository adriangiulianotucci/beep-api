const { Router } = require("express");
const router = new Router();

router.get("/", queryOrders);

async function queryOrders(req, res) {
  // req.logger.info("Querying orders");

  res.status(200).send();
}

module.exports = router;

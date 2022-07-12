const { Router } = require("express");
const router = new Router();

router.get("/", queryUsers);
router.post("/", createUser);

async function queryUsers(req, res) {
  req.logger.info("Querying orders");

  res.status(200).send();
}

async function createUser(req, res) {
  req.logger.info("Creating user", req.body);

  if (!req.body.role) {
    req.logger.verbose("Role is a required attribute. Sending 400 to client");
    return res.status(400).end();
  }

  try {
    const role = await req.model("Role").findById(req.body.role);

    if (!role) {
      req.logger.verbose("Role not found. Sending 400 to client");
      return res.status(400).end();
    }

    const user = await req.model("User").create({
      ...req.body,
      organization: req.user.organization,
    });
  } catch (error) {}
}

module.exports = router;

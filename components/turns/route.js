const { Router } = require("express");
const router = new Router();

router.get("/", getTurns);
router.post("/", createTurn);
router.put("/", completeTurn);

async function getTurns(req, res, next) {
  try {
    const turns = await req.model("Turn").find({});
    res.status(200).send(turns);
  } catch (err) {
    next(err);
  }
}

async function createTurn(req, res, next) {
  try {
    const createdTurn = await req.model("Turn").create({ ...req.body });
    res.status(200).send(createdTurn);
  } catch (err) {
    next(err);
  }
}

async function completeTurn(req, res, next) {
  req.io.emit("message", "hola dea");
  req.io.to("12321341").emit("message", "hellooooo");

  console.log(req.io.sockets.adapter.rooms);

  res.status(200).send();
}

module.exports = router;

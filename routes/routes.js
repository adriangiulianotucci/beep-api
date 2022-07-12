const { Router } = require("express");
const Order = require("../database/schemas/order");

const router = new Router();

router.get("/", async (req, res) => {
  const createdOrder = new Order({
    name: "Adrian",
    status: "pending",
  });

  await createdOrder.save();

  res.send(createdOrder);
});

module.exports = router;

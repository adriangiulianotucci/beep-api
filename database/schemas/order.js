const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  name: { type: String, default: "Adrian" },
  status: { type: String },
});

module.exports = mongoose.model("Order", orderSchema);

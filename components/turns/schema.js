const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const turnTypes = ["free", "taken"];

const turnSchema = new Schema({
  status: { type: String, enum: turnTypes },
  location: { type: ObjectId, ref: "Location", required: true },
  description: { type: String },
  createdBy: { type: ObjectId, ref: "User" },
});

module.exports = turnSchema;

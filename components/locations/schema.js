const mongoose = require("mongoose");

const { Schema } = mongoose;

const locationSchema = new Schema({
  publicId: { type: String },
});

module.exports = locationSchema;

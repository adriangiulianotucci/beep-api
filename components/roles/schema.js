const mongoose = require("mongoose");

const { Schema } = mongoose;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  displayName: { type: String, trim: true },
  description: { type: String, trim: true },
});

module.exports = roleSchema;

const mongoose = require("mongoose");
const validate = require("mongoose-validator");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const emailValidator = validate({ validator: "isEmail" });

const organizationSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: emailValidator,
  },
  name: { type: String, select: false, trim: true },
  timezone: { type: String, default: "America/Argentina/Buenos_Aires" },
});

module.exports = organizationSchema;

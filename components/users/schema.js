const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const emailValidator = validate({ validator: "isEmail" });

const userSchema = new Schema({
  organization: { type: ObjectId, ref: "Organization", required: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate: emailValidator,
  },
  password: { type: String, select: false, required: true },
  firstName: { type: String, required: true, lowercase: true, trim: true },
  lastName: { type: String, required: true, lowercase: true, trim: true },
  role: { type: ObjectId, ref: "Role", required: true },
});

userSchema.method("checkPassword", async function checkPassword(password) {
  if (!password) {
    return Promise.reject(new Error("Password is required"));
  }

  if (!this.password) {
    return false;
  }

  const isMatch = await bcrypt.compare(password, this.password);

  return isMatch;
});

userSchema.pre("validate", async function preValidate() {
  if (!this.password || !this.isModified("password")) {
    return;
  }

  if (this.password.length < 8) {
    this.invalidate(
      "password",
      "Password must be longer than eight characters",
      undefined,
      "short"
    );
    return;
  }

  if (!/[A-Za-z]/.test(this.password)) {
    this.invalidate(
      "password",
      "Password must contain at least one letter",
      undefined,
      "missingLetter"
    );
    return;
  }

  if (!/[0-9]/.test(this.password)) {
    this.invalidate(
      "password",
      "Password must contain at least one number",
      undefined,
      "missingNumber"
    );
    return;
  }

  if (
    this.email &&
    this.password.toLowerCase().indexOf(this.email.toLowerCase()) > -1
  ) {
    this.invalidate(
      "password",
      "Password cannot contain the user's email address",
      undefined,
      "containsEmail"
    );
    return;
  }

  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
});

module.exports = userSchema;

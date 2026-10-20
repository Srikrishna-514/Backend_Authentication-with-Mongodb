const mongoose = require("mongoose");
const AuthUserSchema = mongoose.Schema(
  {
    username: { type: String, required: true, required: true },
    password: { type: String, required: true, required: true },
    bio: { type: String },
    email: { type: String, required: true, required: true },
  },
  { timestamps: true },
);
const AuthUserModel = new mongoose.model("authZ", AuthUserSchema);
module.exports = { AuthUserModel };

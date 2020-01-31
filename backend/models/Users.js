const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  {
    email: String,
    password: String,
    isAdmin: Boolean,
    isSuperAdmin: Boolean
  },
  { collection: "users" }
);
module.exports = mongoose.model("Users", UsersSchema, "users");

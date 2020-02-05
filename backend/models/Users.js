const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    isSuperAdmin: Boolean,
    isDeleted: Boolean
  },
  { collection: "users" }
);
module.exports = mongoose.model("Users", UsersSchema, "users");

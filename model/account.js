const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Nodemy");

const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    username: String,
    password: String,
  },
  {
    collection: "Account",
  }
);

const accountModel = mongoose.model("Account", accountSchema);

module.exports = accountModel;

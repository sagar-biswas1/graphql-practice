const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const originSchema = new Schema({
  country: String,
  year: Number,
});

module.exports = mongoose.model("ORIGIN", originSchema);

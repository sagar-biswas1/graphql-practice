const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carSchema = new Schema({
  name: String,
  model: String,
  country_id: String,
});

module.exports = mongoose.model("CAR", carSchema);

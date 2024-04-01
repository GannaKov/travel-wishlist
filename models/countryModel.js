const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const countrySchema = new Schema({
  name: { type: String, required: [true, "Required"], trim: true },
  alpha2Code: String,
  alpha3Code: String,
});

const Country = model("Country", countrySchema);

module.exports = Country;

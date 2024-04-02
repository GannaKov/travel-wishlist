const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const countrySchema = new Schema({
  name: { type: String, required: [true, "Required"], trim: true },
  alpha2Code: { type: String, required: [true, "Required"], trim: true },
  alpha3Code: { type: String, required: [true, "Required"], trim: true },
  visited: { type: Boolean, default: false },
});

const Country = model("Country", countrySchema);

module.exports = Country;

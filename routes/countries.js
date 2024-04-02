const express = require("express");
countryRouter = express.Router();

const {
  getAllCountries,
  postCountry,
  getCountryByCode,
  updateCountry,
} = require("../controllers/countriesController");

countryRouter.get("/", getAllCountries);
countryRouter.post("/", postCountry);
countryRouter.get("/:code", getCountryByCode);
countryRouter.put("/:code", updateCountry);

module.exports = countryRouter;

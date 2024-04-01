const express = require("express");
countryRouter = express.Router();

const {
  getAllCountries,
  postCountry,
} = require("../controllers/countriesController");

countryRouter.get("/", getAllCountries);
countryRouter.post("/", postCountry);

module.exports = countryRouter;

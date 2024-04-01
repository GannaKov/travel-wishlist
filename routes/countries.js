const express = require("express");
countryRouter = express.Router();

const { getAllCountries } = require("../controllers/countriesController");

countryRouter.get("/", getAllCountries);

module.exports = countryRouter;

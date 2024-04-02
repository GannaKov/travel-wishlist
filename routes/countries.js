const express = require("express");
const { query } = require("express-validator");
const { body } = require("express-validator");
countryRouter = express.Router();

const {
  getAllCountries,
  postCountry,
  getCountryByCode,
  updateCountry,
  //deleteCountry,
  toggleVisitedStatus,
} = require("../controllers/countriesController");

countryRouter.get("/", getAllCountries);
countryRouter.post(
  "/",
  body("name").notEmpty().trim(),
  body("alpha2Code").notEmpty().trim(),
  body("alpha3Code").notEmpty().trim(),
  postCountry
);
countryRouter.get("/:code", getCountryByCode);
countryRouter.put("/:code", updateCountry);
//countryRouter.delete("/:code", deleteCountry);
countryRouter.delete("/:code", toggleVisitedStatus);

module.exports = countryRouter;

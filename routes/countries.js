const express = require("express");
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
countryRouter.post("/", postCountry);
countryRouter.get("/:code", getCountryByCode);
countryRouter.put("/:code", updateCountry);
//countryRouter.delete("/:code", deleteCountry);
countryRouter.delete("/:code", toggleVisitedStatus);

module.exports = countryRouter;

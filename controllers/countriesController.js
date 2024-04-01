const Country = require("../models/countryModel");

// GET
const getAllCountries = async (req, res, next) => {
  try {
    const isSort = req.query.sort;

    const result = isSort
      ? await Country.find().sort({ name: 1 })
      : await Country.find();
    // console.log("res", result);
    if (result.length === 0) {
      throw { status: 404, message: "No student found" };
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// POST
const postCountry = async (req, res, next) => {
  try {
    const { name, alpha2Code, alpha3Code } = req.body;
    const newCountry = new Country({ name, alpha2Code, alpha3Code });
    const result = await newCountry.save();
    if (!result) {
      throw { status: 500, message: "Failed to create country" };
    }
    res.status(201).json({ status: "Created ", code: 201, data: result });
  } catch (err) {
    next(err);
  }
};
module.exports = { getAllCountries, postCountry };

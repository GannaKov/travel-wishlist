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
    const existingCountry = await Country.findOne({
      $or: [
        { alpha2Code: alpha2Code.toUpperCase() },
        { alpha3Code: alpha3Code.toUpperCase() },
      ],
    });
    // console.log("match", existingCountry);
    if (existingCountry) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Country already exists",
      });
    } else {
      const newCountry = new Country({ name, alpha2Code, alpha3Code });
      const result = await newCountry.save();
      if (!result) {
        throw { status: 500, message: "Failed to create country" };
      }
      res.status(201).json({ status: "Created ", code: 201, data: result });
    }
  } catch (err) {
    next(err);
  }
};

//   countries/:code

const getCountryByCode = async (req, res, next) => {
  try {
    const { code } = req.params;

    const country = await Country.findOne({
      $or: [
        { alpha2Code: code.toUpperCase() },
        { alpha3Code: code.toUpperCase() },
      ],
    });

    if (!country) {
      throw { status: 404, message: "Country not found" };
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: country,
    });
  } catch (err) {
    next(err);
  }
};

const updateCountry = async (req, res, next) => {
  try {
    const { code } = req.params;
    const countryName = req.body?.name;
    const countryAlpha2Code = req.body?.alpha2Code?.toUpperCase();
    const countryAlpha3Code = req.body.alpha3Code?.toUpperCase();

    const country = await Country.findOne({
      $or: [
        { alpha2Code: code.toUpperCase() },
        { alpha3Code: code.toUpperCase() },
      ],
    });

    if (!country) {
      throw { status: 404, message: "Country not found" };
    }
    const newCountryName = countryName || country.name;
    const newCountryAlpha2Code = countryAlpha2Code || country.alpha2Code;
    const newCountryAlpha3Code = countryAlpha3Code || country.alpha3Code;
    console.log(
      "new",
      newCountryName,
      newCountryAlpha2Code,
      newCountryAlpha3Code
    );
    console.log("country.id", country.id);
    const updatedCountry = await Country.findByIdAndUpdate(
      { _id: country.id },
      {
        name: newCountryName,
        alpha2Code: newCountryAlpha2Code,
        alpha3Code: newCountryAlpha3Code,
      },
      { new: true }
    );

    if (!updatedCountry) {
      throw res.status(500).send("Error updating country");
    }
    res.status(200).json({
      status: "udated ",
      code: 200,
      data: updatedCountry,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getAllCountries,
  postCountry,
  getCountryByCode,
  updateCountry,
};

const Country = require("../models/countryModel");

const getAllCountries = async (req, res, next) => {
  try {
    const result = await Country.find();
    console.log("res", result);
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

module.exports = { getAllCountries };

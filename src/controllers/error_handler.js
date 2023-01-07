/** @format */
require("dotenv").config();

let ENV = process.env.ENV;
function error_handler(error, req, res, next) {
  try {
    if (ENV == "development") {
      console.log(error);
    }
    return res.render("error", {
      pageTitle: "Error",
      msg: error.message,
      success: false,
    });
  } catch (error) {
    if (ENV == "development") {
      console.log(`The lastest error in error_handler\n : ${error} `);
    }
    process.exit(1);
  }
}

module.exports = error_handler;

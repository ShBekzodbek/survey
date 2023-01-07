/** @format */

require("dotenv").config();

const mongoUrl = process.env.MONGO_URL;

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const conn = async () => {
  try {
    mongoose.connect(mongoUrl, (err) => {
      if (!err) {
        console.log("Connected DB...");
      } else {
        console.log(`There may be error on Connecting DB...${err}`);
        return;
      }
    });
  } catch (error) {
    console.log(`There may be error on Connecting DB...${error}`);
    return;
  }
};

module.exports = conn;

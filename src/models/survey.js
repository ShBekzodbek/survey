/** @format */

const { Schema, model } = require("mongoose");

const surveySchema = new Schema({
  liked: {
    type: Number,
    default: 0,
  },
  disliked: {
    type: Number,
    default: 0,
  },
});

const Survey = model("Survey", surveySchema);

module.exports = Survey;

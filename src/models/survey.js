/** @format */

const { Schema, model } = require("mongoose");

const likeSchema = new Schema({
  liked: {
    type: Number,
    default: 0,
  },
});
const dislikeSchema = new Schema({
  disliked: {
    type: Number,
    default: 0,
  },
});

const Liked = model("Liked", likeSchema);

const Disliked = model("Disliked", dislikeSchema);

module.exports = {
  Liked,
  Disliked,
};

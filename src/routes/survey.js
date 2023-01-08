/** @format */

const express = require("express");

require("dotenv").config();

const { Liked, Disliked } = require("../models/survey");

const router = express.Router();

router.get("/survey", async (req, res, next) => {
  return res.render("survey", { pageTitle: "Survey" });
});

router.post("/survey", async (req, res, next) => {
  const { liked, disliked } = req.body;
  try {
    if ((!liked && !disliked) || (liked && disliked)) {
      return res.status(400).redirect("/survey");
    }
    console.log(liked);
    if (liked == "1") {
      const li = await Liked.create({
        liked: liked,
      });
      let result = await li.save();
      console.log(result);
    } else {
      const disli = await Disliked.create({
        disliked: disliked,
      });
      let result = await disli.save();
      console.log(result);
    }

    return res.status(200).redirect("/result");
  } catch (error) {
    console.log(`Error in survey (post) endpoint \n :${error}`);
    return next(error);
  }
});

// router.get("/delete", async (req, res, next) => {
//   try {

//     const data = await
//   } catch (error) {

//   }
// return res.render("delete", { pageTitle: "Delete all" });
// });
router.post("/delete", async (req, res, next) => {
  const pwd = req.body.pwd;
  try {
    if (pwd == process.env.adminPassword) {
      const result = await Liked.deleteMany({ __v: 0 });
      const result1 = await Disliked.deleteMany({ __v: 0 });
      console.log(result, result1);
      return res.send({
        msg: "All votes have been deleted successfully",
        success: "True",
      });
    } else {
      return res.redirect("/");
    }
  } catch (error) {
    console.log(`Error in delete(post) endpoint \n :${error}`);
    return next(error);
  }
});

router.get("/result", async (req, res, next) => {
  try {
    let liked = await Liked.find();
    let disliked = await Disliked.find();
    liked = liked.length;
    disliked = disliked.length;
    let likesPer = (100 * liked) / (liked + disliked);
    let dislikesPer = (100 * disliked) / (liked + disliked);
    return res.status(200).send({
      msg: "Thanks for voting",
      liked: Math.round(likesPer),
      disliked: Math.round(dislikesPer),
    });
  } catch (error) {
    console.log(`Error in result endpoint \n :${error}`);
    return next(error);
  }
});

module.exports = router;

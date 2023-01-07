/** @format */

const express = require("express");

const Survey = require("../models/survey");

const router = express.Router();

router.get("/survey", async (req, res, next) => {
  return res.render("survey", { pageTitle: "Survey" });
});

router.post("/survey", async (req, res, next) => {
  const survey = await Survey.findById("63b9d77bc856357498caafef");
  let countL = 0,
    countD = 0;

  const { liked, disliked } = req.body;
  try {
    if ((!liked && !disliked) || (liked && disliked)) {
      return res.status(400).redirect("/survey");
    }
    if (liked == "on") {
      countL++;
    } else {
      countD++;
    }
    if (survey.length == 0) {
      const survey = await Survey.create({
        liked: countL,
        disliked: countD,
      });
      let result = survey.save();
      console.log(result);
    } else {
      if (liked == "on") {
        survey.liked++;
      } else {
        survey.disliked++;
      }
      await survey.save();
    }

    return res.status(200).redirect("/result");
  } catch (error) {
    console.log(`Error in survey (post) endpoint \n :${error}`);
    return next(error);
  }
});

router.get("/result", async (req, res, next) => {
  try {
    const survey = await Survey.findById("63b9d77bc856357498caafef");
    let likesPer = (100 * survey.liked) / (survey.liked + survey.disliked);
    let dislikesPer =
      (100 * survey.disliked) / (survey.liked + survey.disliked);
    return res.render("result", {
      pageTitle: "Result",
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

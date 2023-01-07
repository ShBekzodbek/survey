/** @format */

const express = require("express");

const conn = require("./src/config/connnectDB");

const logger = require("morgan");

require("dotenv").config();

const ENV = process.env.ENV;

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "src/views");
console.log(ENV);

if (ENV == "development") {
  app.use(logger("dev"));
}

//connect DB
conn();

const surveyRouter = require("./src/routes/survey");

const port = process.env.PORT || 5000;



app.use("/", surveyRouter);

app.use(require("./src/controllers/error_handler"));

app.use((req, res, next) => {
  res.render("404", {
    pageTitle: "Page not found",
    msg: "Page not found 404",
    success: false,
  });
});

app.listen(port, (err) => {
  if (!err) {
    console.log(`Port:${port} is being listened...`);
  }
});

let likes = 5,
  dislikes = 3;

let likesPer = (100 * likes) / (likes + dislikes);
let dislikesPer = (100 * dislikes) / (likes + dislikes);
console.log(likesPer);
console.log(dislikesPer);

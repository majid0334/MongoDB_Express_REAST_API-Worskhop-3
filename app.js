//dotenv är gjord för att kunna gömma vara databasnman, lösenordt eller anslutnignskog eller api
require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");

//För att kunna hämta datan från boy extention
const bodyParser = require("body-parser");

//hämtar in var webRouter från web-router.js
const webRouter = require("./routes/web-router");
//Vår song rest Api
const songApiRouter = require("./routes/api/song-api-router");
//Vår person rest APi
const peopleApiRouter = require("./routes/api/people-api-router");

const app = express();

//setup för handlebars
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);

//setup för handlebars
app.set("view engine", "hbs");

//För kunna acessa vår publick folder för css
app.use(express.static("public"));

//För hämta datan från vara inpput annars går det in få in datan och detta är en extention
app.use(bodyParser.urlencoded({ extended: false }));
//konverterar data till json och för att kunna hämta ut data
app.use(bodyParser.json());

//för att hämta alla vara routes och alla express.js logik och display
app.use("/", webRouter);
//Alla anrop som kommer ske i songList hanteras av vårt songApiRouter
app.use("/api/songsList", songApiRouter);
//Alla anrop som kommer ske i peopleLISt hanteras av vårt peopleApiRouter
app.use("/api/peoplesList", peopleApiRouter);

app.listen(5500, () => {
  console.log("http://localhost:5500/");
});

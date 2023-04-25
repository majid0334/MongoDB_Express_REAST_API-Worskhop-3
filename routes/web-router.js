//SKriver alla var apps och router logick med andra ord all express.js logik

const express = require("express");
const router = express.Router();

//För att kunna dela upp vara funktioner och hämta dom från databasmappen
const db = require("./../database/mongodb");

//För att kuna display datan i vår home
router.get("/", async (req, res) => {
  //Här hämtar vi getsSong funktionen för att kunna display data och vi sparar det i variable för att sen skicka datan senare.
  const songs = await db.getSongs();
  //vi namger datan med Namnet SongsList
  res.render("home", { songList: songs });
});

//Gå in i  lägga tll data läge
router.get("/new-song", (req, res) => {
  //Renderar våra input
  res.render("new-song");
});

//Skicka all data från input till databasMongoDb
router.post("/new-song", async (req, res) => {
  //De parametrar som vi skicar in och deras value och någon slacks skydd också
  const newSong = {
    artist: req.body.artist,
    song: req.body.song,
  };
  //Här fangar den upp datan som skickas till insertSong funktion i mongodb.js
  await db.insertSong(newSong);

  //Efter det går vi tillbaka till home
  res.redirect("/");
});

//Funktionen för att gå i edit lägga för en spesifik item
router.get("/songList/:id", async (req, res) => {
  //Vi får ideet och skickar det inne i databas mongodb mappen
  const id = req.params.id;
  const song = await db.getSongById(id);

  //När vi har hittar den specifika item med ideen så displays dens propretys när vi är i edit läge i vår hbs edit-song
  res.render("edit-song", { songL: song });
});

//För att upptadera data när vi är i edit läge
router.post("/edit-song/:id", async (req, res) => {
  //De parametrar som vi skicar in och deras value och någon slacks skydd också
  const updatedSong = {
    artist: req.body.artist,
    song: req.body.song,
  };
  //skickar id och updatedSong till mongodb.js
  const id = req.params.id;
  await db.updateSongById(id, updatedSong);

  //efter ändringen går vi tillbaka till home
  res.redirect("/");
});

//För att radera song
router.post("/delete-song/:id", async (req, res) => {
  //skickar id  till mongodb.js
  const id = req.params.id;
  await db.deleteCarById(id);

  res.redirect("/");
});

module.exports = router;

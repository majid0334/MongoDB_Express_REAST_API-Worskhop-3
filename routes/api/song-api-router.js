//För att skapa vårt eget api

const express = require("express");
const router = express.Router();

const { MongoClient, ObjectId } = require("mongodb");
//För att hämta var funkrioner från mongodb filen
const db = require("./../../database/mongodb");

//DEt här är inte roten till home utan roten till songList som displae all vår data den router heter http://localhost:5500/api/songsList
router.get("/", async (req, res) => {
  //den kallar vår funktion getSongs som ligger i vår mongodb.js fil fr diplay vår data i api
  const songsList = await db.getSongs();
  res.send(songsList);
});

//DEt här är funktin för att gå in i edit läge och diplay all data från vår databas
router.get("/:id", async (req, res) => {
  //den kallar vår funktion getSongById som ligger i vår mongodb.js fil för visa data för en song och url för det är http://localhost:5500/api/songsList/:id
  const id = req.params.id;
  const song = await db.getSongById(id);

  res.send(song);
});

//För att kunna pposta till vår databas och url för det är http://localhost:5500/api/songsList
router.post("/", async (req, res) => {
  //De parametrar som vi skicar in och deras value och någon slacks skydd också
  const newSong = {
    artist: req.body.artist,
    song: req.body.song,
    ownerId: new ObjectId(req.body.ownerId),
  };
  //skickar id till mongodb.js
  await db.insertSong(newSong);
  res.sendStatus(201);
});
//För att upptadera data och egentligen kan man srkiva också  http://localhost:5500/api/songsList/:id
router.put("/:id", async (req, res) => {
  //De parametrar som vi skicar in och deras value och någon slacks skydd också
  const updatedSong = {
    artist: req.body.artist,
    song: req.body.song,
    ownerID: new ObjectId(req.body.ownerId),
  };
  //skickar id och updatedSong till mongodb.js
  const id = req.params.id;
  await db.updateSongById(id, updatedSong);

  res.sendStatus(200);
});
//För att radera data och egentligen kan man srkiva också  http://localhost:5500/api/songsList/:id
router.delete("/:id", async (req, res) => {
  //De parametrar som vi skicar in och deras value och någon slacks skydd också
  const id = req.params.id;
  //skickar id till mongodb.js
  await db.deleteCarById(id);
  res.sendStatus(200);
});

module.exports = router;

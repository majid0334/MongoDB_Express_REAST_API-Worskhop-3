const express = require("express");
const router = express.Router();

const db = require("../../database/mongodb");

//För att display alla personer
router.get("/", async (req, res) => {
  const people = await db.getPeople();

  res.send(people);
});

//DEt här är funktin för att gå in i edit läge och diplay all data från vår databas
router.get("/:id", async (req, res) => {
  //den kallar vår funktion getPersonById som ligger i vår mongodb.js fil för visa data för en song och url för det är http://localhost:5500/api/peoplesList/:id
  const id = req.params.id;
  const person = await db.getPersonById(id);

  res.send(person);
});

//För att kunna pposta till vår databas och url för det är http://localhost:5500/api/peopleList
router.post("/", async (req, res) => {
  //De parametrar som vi skicar in och deras value och någon slacks skydd också
  const newPerson = {
    name: req.body.name,
    lastName: req.body.lastName,
    birthYear: req.body.birthYear,
  };
  //skickar id till mongodb.js
  await db.insertPerson(newPerson);
  res.sendStatus(201);
});

//För att upptadera data och egentligen kan man srkiva också  http://localhost:5500/api/peoplesList/:id
router.put("/:id", async (req, res) => {
  const updatedPerson = {
    name: req.body.name,
    lastName: req.body.lastName,
    birthYear: req.body.birthYear,
  };

  const id = req.params.id;
  await db.updatePersonById(id, updatedPerson);

  res.sendStatus(200);
});

//För att radera data och egentligen kan man srkiva också  http://localhost:5500/api/peoplesList/:id
router.delete("/:id", async (req, res) => {
  //De parametrar som vi skicar in och deras value och någon slacks skydd också
  const id = req.params.id;
  //skickar id till mongodb.js
  await db.deletePersonById(id);
  res.sendStatus(200);
});

// GET /api/peoplesList/:id/songsList -> return all songs with person with ID

router.get("/:id/songsList", async (req, res) => {
  const id = req.params.id;
  //Hämtar songs som har dessa id
  const songs = await db.getSongsByOwnerId(id);

  res.send(songs);
});
module.exports = router;

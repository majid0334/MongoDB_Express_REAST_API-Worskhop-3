//I den här mappen skriver in all DabasLogick i vårt får all MONGODB LOGIK.

const { MongoClient, ObjectId } = require("mongodb");

//Connecta till databas och används dotenv för gömma anlustning till mongogodb
const connectionUrl = process.env.MONGODB_URL;
const client = new MongoClient(connectionUrl);
//var Databas namn och används dotenv för gömma databasnamn
const dbName = process.env.MONGODB_DATABASE;

/* Songs */
//Funktion som anluster oss
async function getSongsCollection() {
  await client.connect();
  const db = client.db(dbName);
  //Skapar Collection där alla data ligger
  const collection = db.collection("songs");
  return collection;
}
//funktion för hämta data
module.exports.getSongs = async () => {
  //För att kunna hämta dana från var kollektion
  const collection = await getSongsCollection();
  //Lägga in vår data i array och hämta det därifrån
  const findResult = await collection.find({}).toArray();
  //SongList är namnet på vår array där allt ligger som renderas på home och skicas till home också

  return findResult;
};

//Funktion för att lägga till och vi sätter in newSong som prop
//för att den väntar till den får data som den kan skicka till datbasen i från newSong variablen som ligger i app.js
module.exports.insertSong = async (newSong) => {
  //Hämtar var collection
  const collection = await getSongsCollection();

  //insertOne är för att lägga till data i vår collection
  await collection.insertOne(newSong);
};

//För att få ut specifik id och display datan i våra input. Fångar upp id från app.js
module.exports.getSongById = async (id) => {
  //hämtar specifika id för just en item som tas från app.js
  const objectId = new ObjectId(id);
  //hämtar var kollektion
  const collection = await getSongsCollection();
  //För att hitta en specifik item med den iden
  const songL = await collection.findOne({ _id: objectId });

  return songL;
};

//Här fångar vi upp id, updatedSong för att kunna skika det sedan till dabasen
module.exports.updateSongById = async (id, updatedSong) => {
  //hämtar specifika id för just en item
  const objectId = new ObjectId(id);
  //hämtar var kollektion
  const collection = await getSongsCollection();
  //Här upptaderas all data och $set ger oss möjligheten att upptadera allt som vi skrivit och det ligger under variablen uptaded song
  await collection.updateOne({ _id: objectId }, { $set: updatedSong });
};

//tar emot id från app.js
module.exports.deleteCarById = async (id) => {
  //hämtar specifika id för just en item
  const objectId = new ObjectId(id);
  //hämtar var kollektion
  const collection = await getSongsCollection();
  //raderar spesifika item med den ideen
  await collection.deleteOne({ _id: objectId });
};
//För att hitta alla låtar som är ägdda av den personen
module.exports.getSongsByOwnerId = async (ownerId) => {
  //Hämtar person id
  const objectId = new ObjectId(ownerId);

  const collection = await getSongsCollection();
  //Lägga in vår data i array och hitta dom låtarna med hjälp av personligen id som är i url
  const findResult = await collection.find({ ownerId: objectId }).toArray();

  return findResult;
};

/* /Songs */

/* /People */

//funktion för hämta data
module.exports.getPeople = async () => {
  //För att kunna hämta dana från var kollektion
  const collection = await getPeopleCollection();
  //Lägga in vår data i array och hämta det därifrån
  const findResult = await collection.find({}).toArray();
  //SongList är namnet på vår array där allt ligger som renderas på home och skicas till home också

  return findResult;
};

//För att få ut specifik id och display datan i våra input. Fångar upp id från app.js
module.exports.getPersonById = async (id) => {
  //hämtar specifika id för just en item som tas från app.js
  const objectId = new ObjectId(id);
  //hämtar var kollektion
  const collection = await getPeopleCollection();
  //För att hitta en specifik item med den iden
  const peopleL = await collection.findOne({ _id: objectId });

  return peopleL;
};

//Funktion som anluster oss
async function getPeopleCollection() {
  await client.connect();
  const db = client.db(dbName);
  //Skapar Collection där alla data ligger
  const collection = db.collection("People");
  return collection;
}

module.exports.insertPerson = async (newPerson) => {
  //Hämtar var collection
  const collection = await getPeopleCollection();

  //insertOne är för att lägga till data i vår collection
  await collection.insertOne(newPerson);
};

module.exports.updatePersonById = async (id, updatedPerson) => {
  const objectId = new ObjectId(id);
  const collection = await getPeopleCollection();
  await collection.updateOne({ _id: objectId }, { $set: updatedPerson });
};

//tar emot id från app.js
module.exports.deletePersonById = async (id) => {
  //hämtar specifika id för just en item
  const objectId = new ObjectId(id);
  //hämtar var kollektion
  const collection = await getPeopleCollection();
  //raderar spesifika item med den ideen
  await collection.deleteOne({ _id: objectId });
};

/* /People */

const db = require("./index")

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS Users")
  db.run("DROP TABLE IF EXISTS Flavours")
  db.run("DROP TABLE IF EXISTS Mixes")
  db.run("DROP TABLE IF EXISTS MixCollection")
  db.run(
    `CREATE TABLE "Users" (
      "UserId"	INTEGER NOT NULL UNIQUE,
      "Name"	TEXT NOT NULL,
      PRIMARY KEY("UserId" AUTOINCREMENT)
    )`
  )
  db.run(
    `CREATE TABLE "Flavours" (
      "FlavourId"	INTEGER NOT NULL UNIQUE,
      "Name"	TEXT NOT NULL,
      PRIMARY KEY("FlavourId" AUTOINCREMENT)
    )`
  )
  db.run(
    `CREATE TABLE "Mixes" (
    "MixId"	INTEGER NOT NULL UNIQUE,
    "Name"	TEXT NOT NULL UNIQUE,
    PRIMARY KEY("MixId" AUTOINCREMENT)
  )`
  )
  db.run(
    `CREATE TABLE "MixCollection" (
      "FlavourId"	INTEGER,
      "MixId"	INTEGER,
      FOREIGN KEY("FlavourId") REFERENCES "Mixes"("MixId"),
      FOREIGN KEY("MixId") REFERENCES "Flavours"("FlavourId")
    );`
  )
  db.get("PRAGMA foreign_keys = ON")
})

module.exports = db

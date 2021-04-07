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
      "Email"	TEXT NOT NULL UNIQUE,
      "FavoriteMix"	INTEGER,
      PRIMARY KEY("UserId" AUTOINCREMENT),
      FOREIGN KEY("FavoriteMix") REFERENCES "Mixes"("MixId")
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
      "Creator"	INTEGER NOT NULL,
      PRIMARY KEY("MixId" AUTOINCREMENT),
      FOREIGN KEY("Creator") REFERENCES "Users"("UserId")
    )`
  )
  db.run(
    `CREATE TABLE "MixFlavours" (
      "FlavourId"	INTEGER NOT NULL,
      "MixId"	INTEGER NOT NULL,
      FOREIGN KEY("FlavourId") REFERENCES "Flavours"("FlavourId"),
      FOREIGN KEY("MixId") REFERENCES "Mixes"("MixId")
      )`
  )

})

module.exports = db

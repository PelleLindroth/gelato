const sqlite = require('sqlite3')
const path = require('path')
const dbPath = path.resolve(__dirname, 'gelato.db')
const db = new sqlite.Database(dbPath)
db.run("PRAGMA foreign_keys = ON")

module.exports = db
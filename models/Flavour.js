const db = require('../db')

const createFlavour = ({ name }) => {
  if (!name) throw ('Invalid query. Required: name')

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO Flavours (Name)
      VALUES (?)`,
      [name],
      function (err) {
        err && reject(err)
        !this.lastID && resolve({ success: false, message: `Could not add flavour ${name} ` })

        resolve({ success: true, flavour: { name, id: this.lastID } })
      }
    )
  })
}

const getFlavours = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT Name AS name, FlavourId AS id FROM Flavours`,
      (err, rows) => {
        err && reject(err)
        !rows.length && resolve({ success: false, message: 'No flavours found' })

        resolve({ success: true, count: rows.length, data: rows })
      }
    )
  })
}

const updateFlavour = (name, id) => {
  if (!name || !id) throw ('Invalid query. Required: name in body, id in params')

  return new Promise((resolve, reject) => {
    db.run(`
    UPDATE Flavours
    SET Name = ?
    WHERE FlavourId = ${id}`,
      [name],
      function (err) {
        err && reject(err)
        if (!this.changes) resolve({ success: false, message: `Unable to update flavour with id ${id}` })

        resolve({ success: true, flavour: { name, id } })
      })
  })
}

module.exports = {
  createFlavour,
  getFlavours,
  updateFlavour
}
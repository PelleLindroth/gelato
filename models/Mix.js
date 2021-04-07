const db = require('../db')
const Utils = require('../utils/modelUtils')

const getAllMixes = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT Mixes.Name AS mix_name, Users.Name AS creatorName, Mixes.Creator AS creatorId, Mixes.MixId AS mix_id, Flavours.Name AS flavour_name
      FROM MixFlavours
      INNER JOIN Flavours
      INNER JOIN Mixes
      INNER JOIN Users
      ON MixFlavours.FlavourId = Flavours.FlavourId AND MixFlavours.MixId = Mixes.MixId AND Mixes.Creator = Users.UserId
      ORDER BY MixFlavours.MixId`,
      (err, rows) => {
        err && reject(err)
        if (!rows.length) {
          resolve({ success: false, message: 'No mixes found' })
        } else {
          const reply = Utils.buildMixesReply(rows)

          resolve(reply)
        }
      }
    )
  })
}

const getSingleMix = id => {
  if (!id) throw ('Invalid query. Required: id')

  return new Promise((resolve, reject) => {
    db.get(
      `SELECT Mixes.Name AS mixName, Mixes.Creator AS creatorId, Users.Name AS creatorName FROM Mixes
      INNER JOIN Users
      ON Mixes.Creator = Users.UserId
      WHERE Mixes.MixId = ? `,
      [id],
      (err, row) => {
        err && reject(err)
        if (!row) {
          resolve({ success: false, message: `Could not find mix with id ${id}` })
        } else {
          db.all(
            `SELECT Flavours.name
              FROM MixFlavours
              INNER JOIN Flavours
              ON MixFlavours.FlavourId = Flavours.FlavourId
              WHERE MixFlavours.MixId = ?`,
            [id],
            (err, rows) => {
              err && reject(err)

              resolve({ success: true, result: { id, name: row.mixName, flavours: rows.map(row => row.Name), creator: { id: row.creatorId, name: row.creatorName } } })
            }
          )
        }
      }
    )
  })
}

const getAllVotes = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT Mixes.Name AS name, COUNT(*) AS votes FROM Users
      INNER JOIN Mixes
      ON Mixes.MixId = Users.FavoriteMix
      GROUP BY FavoriteMix`,
      (err, rows) => {
        err && reject(err)
        resolve({ success: true, message: 'Only showing mixes with at least 1 vote', count: rows.length, results: rows })
      }
    )
  })
}

const getVotes = id => {
  if (!id) throw ('Invalid query. Required: id')

  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM Users
      INNER JOIN Mixes
      WHERE Users.FavoriteMix = ? AND Mixes.MixId = Users.FavoriteMix`,
      [id],
      (err, rows) => {
        err && reject(err)

        resolve({ success: true, votes: rows.length })
      }
    )
  })
}

const createEmptyMix = (name, creator) => {
  if (!name || !creator) throw ('Invalid query. Required: name and creator')

  return new Promise((resolve, reject) => {
    db.run(`
     INSERT INTO Mixes (Name, Creator)
     VALUES (?, ?)`,
      [name, creator],
      function (err) {
        err && reject(err)

        db.get(
          `SELECT Name AS name, UserId AS id FROM Users
          WHERE UserId = ?`,
          [creator],
          (err, row) => {
            err && reject(err)

            resolve({ success: true, mix: { name, id: this.lastID }, creator: { id: row.id, name: row.name } })
          }
        )


      })
  })
}

const addFlavour = ({ mix_id, flavour_id }) => {
  if (!mix_id || !flavour_id) throw ('Invalid query. Required: mix_id and flavour_id')

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO MixFlavours (FlavourId, MixId)
      VALUES (?, ?)`,
      [flavour_id, mix_id],
      function (err) {
        err && reject(err)
        !this.changes && resolve({ success: false, message: `Could not add flavour with id ${flavour_id} to mix with id ${mix_id}` })

        db.get(
          `SELECT Mixes.Name AS mixName, Flavours.Name AS flavourName
          FROM MixFlavours
          INNER JOIN Flavours
		      INNER JOIN Mixes
          ON MixFlavours.FlavourId = Flavours.FlavourId
		      WHERE Mixes.MixId = ? AND Flavours.FlavourId = ?`,
          [mix_id, flavour_id],
          (err, row) => {
            err && reject(err)

            resolve({ success: true, mix: { id: mix_id, name: row.mixName }, flavour: { id: flavour_id, name: row.flavourName } })
          }
        )
      }
    )
  })
}

const removeFlavour = ({ mix_id, flavour_id }) => {
  if (!mix_id || !flavour_id) throw ('Invalid query. Required: mix_id and flavour_id')

  return new Promise((resolve, reject) => {
    db.run(
      `DELETE FROM MixFlavours
      WHERE MixId = ? AND FlavourId = ?`,
      [mix_id, flavour_id],
      function (err) {
        err && reject(err)
        !this.changes && resolve({ success: false, message: `Could not remove flavour with id ${flavour_id} from mix with id ${mix_id}` })

        db.get(
          `SELECT Mixes.Name AS mixName, Flavours.Name AS flavourName
          FROM MixFlavours
          INNER JOIN Flavours
		      INNER JOIN Mixes
          ON MixFlavours.FlavourId = Flavours.FlavourId
		      WHERE Mixes.MixId = ? AND Flavours.FlavourId = ?`,
          [mix_id, flavour_id],
          (err, row) => {
            err && reject(err)

            resolve({ success: true, message: `Removed flavour ${row.flavourName} from mix ${row.mixName}` })
          }
        )
      }
    )
  })
}

const deleteMix = id => {
  if (!id) throw ('Invalid query. Required: id')

  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE Users
      SET FavoriteMix = NULL
      WHERE FavoriteMix = ?`,
      [id],
      function (err) {
        err && reject(err)

        db.run(
          `DELETE FROM MixFlavours
            WHERE MixId = ?`,
          [id],
          function (err) {
            err && reject(err)

            db.run(
              `DELETE FROM Mixes
              WHERE MixId = ?`,
              [id],
              function (err) {
                err && reject(err)
                !this.changes && resolve({ success: false, message: `Found no mix with id ${id}` })

                resolve({ success: true, message: `Mix with id ${id} deleted` })
              }
            )
          }
        )
      }
    )
  })
}

module.exports = {
  getAllMixes,
  getSingleMix,
  getAllVotes,
  getVotes,
  createEmptyMix,
  addFlavour,
  removeFlavour,
  deleteMix,
}
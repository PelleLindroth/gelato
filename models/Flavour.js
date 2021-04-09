const pool = require('../db/connection')

const createFlavour = ({ name }) => {
  if (!name) throw ('Invalid query. Required: name')

  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO Flavours (name)
      VALUES ($1)
      RETURNING *`,
      [name],
      (err, result) => {
        err && reject(err)
        !result.rowCount && resolve({ success: false, message: `Could not add flavour ${name} ` })

        resolve({ success: true, flavour: result.rows[0] })
      }
    )
  })
}

const getFlavours = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM Flavours`,
      (err, result) => {
        err && reject(err)
        !result.rows.length && resolve({ success: false, message: 'No flavours found' })

        resolve({ success: true, count: result.rowCount, results: result.rows })
      }
    )
  })
}

const updateFlavour = (name, id) => {
  if (!name || !id) throw ('Invalid query. Required: name in body, id in params')

  return new Promise((resolve, reject) => {
    pool.query(`
    UPDATE Flavours
    SET Name = $1
    WHERE flavour_id = ${id}
    RETURNING *`,
      [name],
      (err, result) => {
        err && reject(err)
        !result.rows.length && resolve({ success: false, message: `Unable to update flavour with id ${id}` })

        resolve({ success: true, flavour: result.rows[0] })
      })
  })
}

module.exports = {
  createFlavour,
  getFlavours,
  updateFlavour
}
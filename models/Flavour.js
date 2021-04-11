const pool = require('../db/connection')

const createFlavour = ({ name }) => {
  if (!name) throw ('Invalid query. Required: name')

  return new Promise(async (resolve, reject) => {
    try {
      const result = await pool.query(
        `INSERT INTO Flavours (name)
        VALUES ($1)
        RETURNING *`,
        [name])

      !result.rowCount && reject({ message: `Could not add flavour ${name} ` })

      resolve({ success: true, flavour: result.rows[0] })
    } catch (err) { reject({ code: err.code, message: err.detail }) }
  }
  )
}

const getFlavours = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await pool.query(
        `SELECT * FROM Flavours`)

      !result.rows.length && reject({ message: 'No flavours found' })

      resolve({ success: true, count: result.rowCount, results: result.rows })
    } catch (err) { reject({ code: err.code, message: err.detail }) }
  }
  )
}

const updateFlavour = (name, id) => {
  if (!name || !id) throw ('Invalid query. Required: name in body, id in params')

  return new Promise(async (resolve, reject) => {
    try {
      const result = await pool.query(`
      UPDATE Flavours
      SET Name = $1
      WHERE flavour_id = ${id}
      RETURNING *`,
        [name])

      !result.rows.length && reject({ message: `Unable to update flavour with id ${id}` })

      resolve({ success: true, flavour: result.rows[0] })
    } catch (err) { reject({ code: err.code, message: err.detail }) }
  })
}

module.exports = {
  createFlavour,
  getFlavours,
  updateFlavour
}
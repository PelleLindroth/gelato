const db = require('../db/index')

const getFlavours = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM Flavours`,
      (err, rows) => {
        err && reject(err)
        !rows.length && resolve({ success: false, message: 'No flavours found' })

        resolve({ success: true, count: rows.length, data: rows })
      }
    )
  })
}

module.exports = {
  getFlavours
}
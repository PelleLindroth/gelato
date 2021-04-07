const db = require('../db')

const createUser = ({ name, email }) => {
  if (!name || !email) throw ('Invalid query. Required: name and email in body')

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO Users (Name, Email)
      VALUES (?, ?)`,
      [name, email],
      function (err) {
        err && reject(err)
        !this.lastID && resolve({ success: false, message: `Could not create user` })

        resolve({ success: true, user: { name, email, id: this.lastID } })
      }
    )
  })
}

const getSingleUser = id => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT UserId AS id, Name AS name, Email AS email, FavoriteMix AS favoriteMix FROM Users
      WHERE UserId = ?`,
      [id],
      (err, row) => {
        err && reject(err)
        !row && resolve({ success: false, message: `Could not find user with id ${id}` })

        resolve({ success: true, data: row })
      }
    )
  })
}

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT UserId AS id, Name AS name, Email AS email, FavoriteMix AS favoriteMix FROM Users`,
      function (err, rows) {
        err && reject(err)
        !rows.length && resolve({ success: false, count: 0, message: 'No users' })

        resolve({ success: true, count: rows.length, data: rows })
      }
    )
  })
}

const castVote = ({ user_id, mix_id }) => {
  if (!user_id || !mix_id) throw ('Invalid query. Required: user_id and mix_id')

  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE Users
      SET FavoriteMix = ?
      WHERE UserId = ?`,
      [mix_id, user_id],
      function (err) {
        err && reject(err)
        !this.changes && resolve({ success: false, message: `Could not cast vote on mix with id ${mix_id}` })

        resolve({ success: true, message: `User with id ${user_id} cast their vote on mix with id ${mix_id}` })
      }
    )
  })
}

module.exports = {
  createUser,
  getSingleUser,
  getAllUsers,
  castVote
}
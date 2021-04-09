const pool = require('../db/connection')

const createUser = ({ name, email }) => {
  if (!name || !email) throw ('Invalid query. Required: name and email in body')

  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO users (name, email)
      VALUES ($1, $2)
      RETURNING *`,
      [name, email],
      (err, result) => {
        err && reject(err)
        !result.rowCount && resolve({ success: false, message: `Could not create user` })

        resolve({ success: true, user: result.rows[0] })
      }
    )
  })
}

const getSingleUser = id => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM Users
      WHERE user_id = $1`,
      [id],
      (err, result) => {
        err && reject(err)
        !result.rowCount && resolve({ success: false, message: `Could not find user with id ${id}` })

        resolve({ success: true, data: result.rows[0] })
      }
    )
  })
}

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM Users
      ORDER BY user_id`,
      (err, result) => {
        err && reject(err)
        !result.rowCount && resolve({ success: false, message: 'No users found' })

        resolve({ success: true, count: result.rowCount, data: result.rows })
      }
    )
  })
}

const castVote = ({ user_id, mix_id }, email) => {
  if (!user_id || !mix_id | !email) throw ('Invalid query. Required: user_id and mix_id in path, email in body')

  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT email FROM users
      WHERE user_id = $1`,
      [user_id],
      (err, result) => {
        err && reject(err)
        if (result.rows[0].email.localeCompare(email)) reject({ success: false, message: 'Access denied' })

        pool.query(
          `UPDATE users
          SET favorite_mix = $1
          WHERE user_id = $2`,
          [mix_id, user_id],
          (err, result) => {
            err && reject(err)
            !result.rowCount && resolve({ success: false, message: `Could not cast vote on mix with id ${mix_id}` })

            resolve({ success: true, message: `User with id ${user_id} cast their vote on mix with id ${mix_id}` })
          }
        )
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
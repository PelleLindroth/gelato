const pool = require('../db/connection')

const createUser = ({ name, email }) => {
  if (!name || !email) throw ('Invalid query. Required: name and email in body')

  return new Promise(async (resolve, reject) => {
    try {
      const result = await pool.query(
        `INSERT INTO users (name, email, role)
        VALUES ($1, $2, 'customer')
        RETURNING *`,
        [name, email])

      !result.rowCount && reject({ message: `Could not create user` })

      resolve({ success: true, user: result.rows[0] })
    } catch (err) { reject(err) }
  })
}

const getSingleUser = id => {
  if (!id) throw ('Invalid query. Required: ')
  return new Promise(async (resolve, reject) => {
    try {
      const { rowCount, rows } = await pool.query(`SELECT * FROM Users WHERE user_id = $1`, [id])
      !rowCount && reject({ message: `Could not find user with id ${id}` })

      resolve({ success: true, user: rows[0] })
    } catch (err) { reject(err) }
  })
}

const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await pool.query(
        `SELECT * FROM Users
        ORDER BY user_id`)

      !result.rowCount && reject({ message: 'No users found' })

      resolve({ success: true, count: result.rowCount, results: result.rows })
    } catch (err) { reject(err) }
  }
  )
}

const castVote = ({ user_id, mix_id }, email) => {
  if (!user_id || !mix_id | !email) throw ('Invalid query. Required: user_id and mix_id in path, email in body')

  return new Promise(async (resolve, reject) => {
    try {
      const authResult = await pool.query(
        `SELECT email FROM users
        WHERE user_id = $1`,
        [user_id])

      authResult.rows[0].email.localeCompare(email) && reject({ message: 'Access denied' })

      const result = await pool.query(
        `UPDATE users
            SET favorite_mix = $1
            WHERE user_id = $2`,
        [mix_id, user_id])

      !result.rowCount && reject({ message: `Could not cast vote on mix with id ${mix_id}` })

      resolve({ success: true, message: `User with id ${user_id} cast their vote on mix with id ${mix_id}` })
    } catch (err) { eject(err) }
  })
}

module.exports = {
  createUser,
  getSingleUser,
  getAllUsers,
  castVote
}
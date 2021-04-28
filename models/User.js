const pool = require('../db/connection')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const createUser = ({ name, email, password }) => {
  if (!name || !email || !password) throw ('Invalid query. Required: name, email and password in body')

  const digest = bcrypt.hashSync(password, 10)

  return new Promise(async (resolve, reject) => {
    try {
      const result = await pool.query(
        `INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, 'customer')
        RETURNING name, user_id, email`,
        [name, email, digest]
      )

      !result.rowCount && reject({ message: `Could not create user` })

      resolve({ success: true })
    } catch (err) { reject({ code: err.code, message: err.detail }) }
  })
}

const loginUser = async ({ email, password }) => {
  if (!email || !password) throw ('Invalid query. Required: email and password in body')

  const result = await pool.query(`SELECT * FROM USERS WHERE email = $1`, [email])
  const valid = bcrypt.compareSync(password, result.rows[0].password)

  if (valid) {
    const payload = { email }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

    const user = {
      name: result.rows[0].name,
      email: result.rows[0].email,
      id: result.rows[0].user_id,
      favoriteMix: result.rows[0].favorite_mix,
      token
    }

    return ({ success: true, user })
  } else {
    return ({ success: false, message: 'Access denied' })
  }
}

const getUserInfo = async email => {
  return new Promise(async (resolve, reject) => {
    const result = await pool.query(`
    SELECT user_id as id, name, email, role, favorite_mix FROM USERS
    WHERE email = $1`, [email])

    if (result.rowCount) {
      resolve({ success: true, result: result.rows[0] })
    } else {
      reject({ success: false, message: 'Access denied' })
    }
  })
}

const getSingleUser = id => {
  if (!id) throw ('Invalid query. Required: user_id')

  return new Promise(async (resolve, reject) => {
    try {
      const result = await pool.query(`SELECT * FROM Users WHERE user_id = $1`, [id])

      !result.rowCount && reject({ message: `Could not find user with id ${id}` })

      resolve({ success: true, user: result.rows[0] })
    } catch (err) { reject({ code: err.code, message: err.detail }) }
  })
}

const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await pool.query(`SELECT * FROM Users ORDER BY user_id`)

      !result.rowCount && reject({ message: 'No users found' })

      resolve({ success: true, count: result.rowCount, results: result.rows })
    } catch (err) { reject({ code: err.code, message: err.detail }) }
  }
  )
}

const castVote = ({ user_id, mix_id }, email) => {
  if (!user_id || !mix_id | !email) throw ('Invalid query. Required: user_id and mix_id in path, email in body')

  return new Promise(async (resolve, reject) => {
    try {
      const authResult = await pool.query(`SELECT email FROM users WHERE user_id = $1`, [user_id])

      authResult.rows[0].email.localeCompare(email) && reject({ message: 'Access denied' })

      const result = await pool.query(
        `UPDATE users
            SET favorite_mix = $1
            WHERE user_id = $2`,
        [mix_id, user_id])

      !result.rowCount && reject({ message: `Could not cast vote on mix with id ${mix_id}` })

      resolve({ success: true, message: `User with id ${user_id} cast their vote on mix with id ${mix_id}` })
    } catch (err) { reject({ code: err.code, message: err.detail }) }
  })
}

module.exports = {
  createUser,
  loginUser,
  getUserInfo,
  getSingleUser,
  getAllUsers,
  castVote
}
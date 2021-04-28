const db = require('../db/connection')
const { DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Mix = require('./Mix')

const User = db.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Username already exists'
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Email already exists!'
    },
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  favoriteMix: {
    type: DataTypes.INTEGER,
  }
}, {
  timestamps: false
})

//Creator in Mix
User.hasMany(Mix, {
  foreignKey: 'creator',
  allowNull: false
})
Mix.belongsTo(User)

// FavoriteMix in User
Mix.hasMany(User, {
  foreignKey: 'favoriteMix',
  constraints: false
})

User.beforeCreate((user, options) => {
  user.password = bcrypt.hashSync(user.password, 10)
})

User.authenticate = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } })
  if (!user) return ({ success: false, message: 'Invalid credentials. Please check your email' })

  const valid = bcrypt.compareSync(password, user.password)

  if (valid) {
    const payload = { email, id: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return { success: true, token }
  } else {
    return ({ success: false, message: 'Access denied. Your email and password don\'t match' })
  }
}

User.validateToken = async (token) => {
  try { return jwt.verify(token, process.env.JWT_SECRET) }
  catch (err) { return err } // throw tokenExpired/Unauthorized
}

module.exports = User
const User = require('../models/User')

const authorize = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) { throw ('Unauthorized') }
  const token = authorization.replace('Bearer ', '')
  const user = await User.validateToken(token)
  req.user = user
  next()
}

module.exports = authorize
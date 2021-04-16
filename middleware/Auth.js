const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_SECRET)
    req.userEmail = data.email

    next()

  } catch (err) {
    res.status(403).json({ success: false, message: 'Access denied' })
  }
}

module.exports = authenticate
const mainErrorHandler = (err, req, res, next) => {
  if (err.errorCode) {
    res.status(err.errorCode).json({ success: false, error: err.errorMessage })
  } else {
    res.json({ success: false, err })
  }
}

class authErrorHandler extends Error {
  constructor() {
    super()
    this.errorCode = 401
    this.errorMessage = 'Access denied'
  }
}

module.exports = {
  mainErrorHandler,
  authErrorHandler
}
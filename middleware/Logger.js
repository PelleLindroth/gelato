const Logger = (req, res, next) => {
  console.log(new Date())
  console.log(`${req.method}${req.path}`)
  next()
}

module.exports = Logger
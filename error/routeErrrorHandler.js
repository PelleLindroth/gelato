const routeErrorHandler = (err, req, res, next) => {
  res.json({ success: false, error: err })
}

module.exports = routeErrorHandler
const Flavour = require('../models/Flavour')

const getFlavours = async (req, res, next) => {
  try { res.send(await Flavour.getFlavours()) }
  catch (err) { next(err) }
}

module.exports = {
  getFlavours
}
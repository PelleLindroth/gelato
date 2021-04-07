const Flavour = require('../models/Flavour')

const createFlavour = async (req, res, next) => {
  try { res.json(await Flavour.createFlavour(req.body)) }
  catch (err) { next(err) }
}

const getFlavours = async (req, res, next) => {
  try { res.json(await Flavour.getFlavours()) }
  catch (err) { next(err) }
}

const updateFlavour = async (req, res, next) => {
  try { res.json(await Flavour.updateFlavour(req.body.name, req.params.id)) }
  catch (err) { next(err) }
}

module.exports = {
  createFlavour,
  getFlavours,
  updateFlavour
}
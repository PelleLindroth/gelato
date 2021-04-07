const Mix = require('../models/Mix')

const getAllMixes = async (req, res, next) => {
  try { res.json(await Mix.getAllMixes()) }
  catch (err) { next(err) }
}

const getSingleMix = async (req, res, next) => {
  try { res.json(await Mix.getSingleMix(req.params.id)) }
  catch (err) { next(err) }
}

const getAllVotes = async (req, res, next) => {
  try { res.json(await Mix.getAllVotes()) }
  catch (err) { next(err) }
}

const getVotes = async (req, res, next) => {
  try { res.json(await Mix.getVotes(req.params.id)) }
  catch (err) { next(err) }
}

const createEmptyMix = async (req, res, next) => {
  try { res.json(await Mix.createEmptyMix(req.body.name, req.params.id)) }
  catch (err) { next(err) }
}


const addFlavour = async (req, res, next) => {
  try { res.send(await Mix.addFlavour(req.params)) }
  catch (err) {
    next(err)
  }
}

const removeFlavour = async (req, res, next) => {
  try { res.send(await Mix.removeFlavour(req.params)) }
  catch (err) {
    next(err)
  }
}

const deleteMix = async (req, res, next) => {
  try { res.json(await Mix.deleteMix(req.params.id)) }
  catch (err) { next(err) }
}

module.exports = {
  getAllMixes,
  getSingleMix,
  getAllVotes,
  getVotes,
  createEmptyMix,
  addFlavour,
  removeFlavour,
  deleteMix
}
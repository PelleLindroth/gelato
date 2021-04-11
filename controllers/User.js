const User = require('../models/User')

const createUser = async (req, res, next) => {
  try { res.json(await User.createUser(req.body)) }
  catch (err) { next(err) }
}

const getSingleUser = async (req, res, next) => {
  try { res.json(await User.getSingleUser(req.params.id)) }
  catch (err) { next(err) }
}

const getAllUsers = async (req, res, next) => {
  try { res.json(await User.getAllUsers()) }
  catch (err) { next(err) }
}

const castVote = async (req, res, next) => {
  try { res.json(await User.castVote(req.params, req.body.email)) }
  catch (err) { next(err) }
}

module.exports = {
  createUser,
  getSingleUser,
  getAllUsers,
  castVote
}
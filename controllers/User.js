const User = require('../models/User')

const createUser = async (req, res, next) => {
  try { res.json(await User.createUser(req.body)) }
  catch (err) { next(err) }
}

const loginUser = async (req, res) => {
  try { res.json(await User.loginUser(req.body)) }
  catch (err) { res.status(403).json({ success: false, message: 'access denied' }) }
}

const getUserInfo = async (req, res) => {
  try { res.json(await User.getUserInfo(req.userEmail)) }
  catch (err) { res.status(403).json({ success: false, message: 'access denied' }) }
}

const getSingleUser = async (req, res, next) => {
  console.log('in controller');
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
  getUserInfo,
  getSingleUser,
  getAllUsers,
  castVote,
  loginUser
}
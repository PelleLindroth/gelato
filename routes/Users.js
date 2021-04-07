const express = require('express')
const UserRoutes = express.Router()
const User = require('../controllers/User')

// Create user
UserRoutes.post('/users', User.createUser)

// Get all users
UserRoutes.get('/users', User.getAllUsers)

// Get single user
UserRoutes.get('/users/:id', User.getSingleUser)

// User cast vote
UserRoutes.patch('/users/:user_id/mixes/:mix_id', User.castVote)

module.exports = UserRoutes
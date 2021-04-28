const express = require('express')
const UserRoutes = express.Router()
const User = require('../controllers/User')
const authenticate = require('../middleware/Auth')

// Create user
UserRoutes.post('/register', User.createUser)  // ta emot namn, email och password // 

// Log in user
UserRoutes.post('/auth', User.loginUser)  // Email and password in a json body. Send back jwt

// Get user info
UserRoutes.get('/me', authenticate, User.getUserInfo)

// Get all users
UserRoutes.get('/users', User.getAllUsers)

// Get single user
UserRoutes.get('/users/:id', User.getSingleUser)

// User cast vote
UserRoutes.patch('/users/:user_id/mixes/:mix_id', authenticate, User.castVote)

module.exports = UserRoutes
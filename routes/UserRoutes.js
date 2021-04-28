const express = require('express')
const UserRoutes = express.Router()
const UserController = require('../controllers/User')
const authorize = require('../middleware/authorize')

// Register user
UserRoutes.post('/users/register', UserController.register)

// Login user
UserRoutes.post('/users/auth', UserController.login)

// Get user
UserRoutes.get('/users/me', authorize, UserController.get)

// Get all users
UserRoutes.get('/users/all', UserController.getAll)

// Cast vote
UserRoutes.post('/users/:mix_id', authorize, UserController.vote)

module.exports = UserRoutes
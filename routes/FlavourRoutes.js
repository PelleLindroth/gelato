const express = require('express')
const FlavourRoutes = express.Router()
const FlavourControllers = require('../controllers/Flavour')

// Create flavour
FlavourRoutes.post('/flavours', FlavourControllers.create)

// Get all flavours
FlavourRoutes.get('/flavours', FlavourControllers.get)

module.exports = FlavourRoutes
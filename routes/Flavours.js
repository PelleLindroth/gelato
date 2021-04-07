const express = require('express')
const FlavourRoutes = express.Router()
const Flavour = require('../controllers/Flavour')

// Create flavour
FlavourRoutes.post('/flavours', Flavour.createFlavour)

// Get all flavours
FlavourRoutes.get('/flavours', Flavour.getFlavours)

// Update flavour
FlavourRoutes.patch('/flavours/:id', Flavour.updateFlavour)

module.exports = FlavourRoutes
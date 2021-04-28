const express = require('express')
const MixRoutes = express.Router()
const MixController = require('../controllers/Mix')
const authorize = require('../middleware/authorize')

// Create mix
MixRoutes.post('/mixes', authorize, MixController.create)

// Get all mixes
MixRoutes.get('/mixes', MixController.get)

// Get mixes by flavour
MixRoutes.get('/mixes/flavours/:flavour_id', MixController.getByFlavour)

// Delete mix
MixRoutes.delete('/mixes/:mix_id', authorize, MixController.delete)

// Add flavour to mix
MixRoutes.put('/mixes/:mix_id/flavours/:flavour_id', authorize, MixController.addFlavour)

// Remove flavour from mix
MixRoutes.delete('/mixes/:mix_id/flavours/:flavour_id', authorize, MixController.removeFlavour)

module.exports = MixRoutes
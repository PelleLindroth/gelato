const express = require('express')
const MixRoutes = express.Router()
const Mixes = require('../controllers/Mix')

// Get all mixes
MixRoutes.get('/mixes', Mixes.getAllMixes)

// Get single mix
MixRoutes.get('/mixes/:id', Mixes.getSingleMix)

// Create new mix
MixRoutes.post('/mixes/users/:id', Mixes.createEmptyMix)

// Add flavour to mix
MixRoutes.put('/mixes/:mix_id/users/:user_id/flavours/:flavour_id', Mixes.addFlavour)

// Remove flavour from mix
MixRoutes.delete('/mixes/:mix_id/users/:user_id/flavours/:flavour_id', Mixes.removeFlavour)

// Delete mix
MixRoutes.delete('/mixes/:mix_id/users/:user_id', Mixes.deleteMix)

module.exports = MixRoutes
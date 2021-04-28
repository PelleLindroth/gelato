const express = require('express')
const MixRoutes = express.Router()
const Mixes = require('../controllers/Mix')
const authenticate = require('../middleware/Auth')

// Get all mixes
MixRoutes.get('/mixes', Mixes.getAllMixes)

// Get single mix
MixRoutes.get('/mixes/:id', Mixes.getSingleMix)

// Create new mix
MixRoutes.post('/mixes/users/:id', authenticate, Mixes.createEmptyMix)

// Add flavour to mix
MixRoutes.put('/mixes/:mix_id/users/:user_id/flavours/:flavour_id', authenticate, Mixes.addFlavour)

// Remove flavour from mix
MixRoutes.delete('/mixes/:mix_id/users/:user_id/flavours/:flavour_id', authenticate, Mixes.removeFlavour)

// Delete mix
MixRoutes.delete('/mixes/:mix_id/users/:user_id', authenticate, Mixes.deleteMix)

module.exports = MixRoutes
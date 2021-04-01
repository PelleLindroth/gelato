const express = require('express')
const FlavourRoutes = express.Router()
const Flavour = require('../controllers/Flavour')

FlavourRoutes.get('/flavours', Flavour.getFlavours)

module.exports = FlavourRoutes
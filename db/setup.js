const db = require('./connection')
require('../models/Mix')
require('../models/Flavour')
require('../models/User')

db.sync({ force: true })
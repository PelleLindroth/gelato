const Flavour = require('../models/Flavour')

module.exports = {
  async create(req, res, next) {
    try { res.json(await Flavour.create(req.body)) }
    catch (err) { next(err) }
  },
  async get(req, res, next) {
    try {
      const flavours = await Flavour.findAll({
        order: ['name']
      })
      res.json(flavours.map(flavour => ({ id: flavour.id, name: flavour.name })))
    }
    catch (err) { next(err) }
  }
}

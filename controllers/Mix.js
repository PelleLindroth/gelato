const Mix = require('../models/Mix')
const Flavour = require('../models/Flavour')
const User = require('../models/User')

module.exports = {
  async create(req, res, next) {
    try {
      const mix = await Mix.create({ name: req.body.name, creator: req.user.id })
      await mix.addFlavours(JSON.parse(req.body.flavours))
      res.json({ success: true, message: `New mix ${req.body.name} created with id ${mix.id}` })
    } catch (err) {
      console.log(err);
      res.json({ err })
    }
  },
  async get(req, res, next) {
    try {
      const mixes = await Mix.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [
          {
            model: Flavour,
            through: {
              attributes: []
            }
          }
        ]
      })

      for (let mix of mixes) {
        let response = await User.findAndCountAll({
          where: {
            favoriteMix: mix.id
          }
        })
        mix.votes = response.count
      }

      res.send(mixes)
    } catch (err) { next(err) }
  },
  async getByFlavour(req, res, next) {
    try {
      const mixes = await Mix.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [{
          model: Flavour,
          through: {
            attributes: []
          },
          where: { id: req.params.flavour_id }
        }]
      })

      res.json({ mixes })
    } catch (err) { next(err) }
  },
  async delete(req, res, next) {
    try {
      const deleted = await Mix.destroy({
        where: {
          id: req.params.mix_id
        }
      })

      res.json({ deleted })
    } catch (err) {
      res.status(500).send({ success: false, error: err })
    }
  },
  async addFlavour(req, res, next) {
    try {
      const mix = await Mix.findOne({ where: { id: req.params.mix_id } })
      console.log(req.params.flavour_id)
      if (!mix) throw ('Mix does not exist')
      if (mix.creator != req.user.id) throw ('Access denied')

      await mix.addFlavour(req.params.flavour_id)
      res.json({ success: true })
    } catch (err) { next(err) }
  },
  async removeFlavour(req, res, next) {
    try {
      const mix = await Mix.findOne({ where: { id: req.params.mix_id } })

      if (!mix) throw ('Mix does not exist')
      if (mix.creator != req.user.id) throw ('Access denied')

      await mix.removeFlavour(req.params.flavour_id)
      res.json({ success: true })
    } catch (err) { next(err) }
  }
}
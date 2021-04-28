const User = require('../models/User')

module.exports = {
  async register(req, res, next) {
    try {
      await User.create(req.body)
      res.send({ success: true, message: 'User successfully created' })
    } catch (err) { next(err) }
  },
  async login(req, res, next) {
    try {
      const user = await User.authenticate(req.body)
      res.json(user)
    } catch (err) { next(err) }
  },
  async get(req, res, next) {
    try {
      const user = await User.findOne({
        where: { email: req.user.email }
      })

      res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, favoriteMix: user.favoriteMix } })
    } catch (err) { next(err) }
  },
  async getAll(req, res, next) {
    try {
      const users = await User.findAll()

      res.json({
        success: true, users: users.map(user => (
          { id: user.id, name: user.name }
        ))
      })
    } catch (err) { next(err) }
  },
  async vote(req, res, next) {
    console.log(req.user);
    try {
      const success = await User.update({ favoriteMix: req.params.mix_id }, { where: { id: req.user.id } })
      console.log(success)
      res.json({ success: true })
    } catch (err) { next(err) }
  }
}
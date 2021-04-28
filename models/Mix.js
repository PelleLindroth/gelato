const db = require('../db/connection')
const { DataTypes } = require('sequelize')
const Flavour = require('./Flavour')

const Mix = db.define('Mix', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  creator: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  votes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
})

//MixFlavours
Mix.belongsToMany(Flavour, { through: 'MixFlavours' })
Flavour.belongsToMany(Mix, { through: 'MixFlavours' })

module.exports = Mix
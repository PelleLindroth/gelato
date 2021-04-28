const db = require('../db/connection')
const { DataTypes } = require('sequelize')

const Flavour = db.define('Flavour', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
}
)

module.exports = Flavour
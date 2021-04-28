const { Sequelize } = require('sequelize')

const db = new Sequelize('scoops', 'me', 'pastweed', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = db
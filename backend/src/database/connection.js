const dbEngine = process.env.DB_ENGINE || 'development'
const knex = require('knex')

const config = require('../../knexfile')[dbEngine]

const db = knex(config.development)

module.exports = db;
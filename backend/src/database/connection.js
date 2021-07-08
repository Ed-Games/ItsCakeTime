const dbEngine = process.env.DB_ENGINE || 'development'
const knex = require('knex')

const config = require('../../knexfile')

const db = knex(config[dbEngine])

module.exports = db;
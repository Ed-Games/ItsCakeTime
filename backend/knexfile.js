// Update with your config settings.

const parse = require('pg-connection-string')
const pgConfig = parse(process.env.DATABASE_URL)
pgConfig.ssl = { rejectUnauthorized: false }

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },

    migrations : {
      directory : "./src/database/migrations"
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: pgConfig,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory : "./src/database/migrations"
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

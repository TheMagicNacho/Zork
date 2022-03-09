// import the dotenv using ES6 syntax
import 'dotenv/config';

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 export const development = {
  client: 'postgresql',
  connection: 'postgres://postgres:docker@localhost:5432/zork_db'
};

export const staging = {
  client: 'postgresql',
  connection: {
    database: 'my_db',
    user: 'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
export const production = {
  client: 'postgresql',
  connection: {
    database: 'my_db',
    user: 'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
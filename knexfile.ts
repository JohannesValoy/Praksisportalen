import type { Knex } from "knex";
import path from "path";
import { env } from "node:process";

// Update with your config settings.
const extension =
  process.env.NODE_CONFIG_ENV === 'production' || process.env.NODE_CONFIG_ENV === 'staging'
    ? 'js'
    : 'ts';

console.log('extension ============> ', extension);

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      uri: env.DATABASE_URL,
    },
    migrations: {
      directory: path.join(__dirname, "src/knex/migrations"),
      extension: extension,
      tableName: "knex_migrations",
      loadExtensions: [`.${extension}`],
    },
    seeds: {
      directory: path.join(__dirname, "src/knex/seeds"),
    }
  },

  staging: {
    client: "mysql2",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "migrations",
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "mysql2",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "migrations",
      tableName: "knex_migrations"
    }
  }
}

export default config;

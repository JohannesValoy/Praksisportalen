import type { Knex } from "knex";
import { env } from "process";

// Update with your config settings.

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      uri: env.DATABASE_URL,
    },
    migrations: {
      directory: "migrations",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "seeds"
    }
  },

  staging: {
    client: "postgresql",
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
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
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

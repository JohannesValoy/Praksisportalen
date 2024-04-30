import type { Knex } from "knex";
import path from "path";
import { env } from "node:process";
/**
 * Config for Knex
 * @type {Knex.Config}
 */
export const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      uri: env.DATABASE_URL,
    },
    migrations: {
      directory: path.join(__dirname, "migrations"),
      extension: "ts",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: path.join(__dirname, "seeds"),
    },
  },

  production: {
    client: "mysql2",
    connection: {
      uri: env.DATABASE_URL,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(__dirname, "migrations"),
      extension: "ts",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: path.join(__dirname, "seeds"),
    },
  },
};

export default config;

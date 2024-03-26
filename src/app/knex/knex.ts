import { env } from "process";

const knex = require('knex') ({
    client: 'mysql',
    connection: {
        host: 'db',
        user: 'root',
        password: env.MYSQL_ROOT_PASSWORD,
        database: 'praksislista'
}})
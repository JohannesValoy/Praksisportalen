import knex from "knex";

const evn = process.env.NODE_ENV || 'development';
const config = require('../knexfile').config;
const client = knex(config[evn]);


export default client;
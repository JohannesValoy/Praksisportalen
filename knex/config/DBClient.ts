import Knex from 'knex';

const evn = process.env.NODE_ENV || 'development';
console.log("Hello world")
const config = require('../knexfile').config;
const client = Knex(config[evn]);

export default client;
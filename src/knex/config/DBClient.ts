import Knex from 'knex';

const evn = process.env.NODE_ENV || 'development';
const config = require('@/../knexfile').config;
const DBclient = Knex(config[evn]);

export default DBclient;
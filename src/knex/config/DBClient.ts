"use server";
import Knex from "knex";
import KnexConfig from "@/knex/knexfile";

const evn = process.env.NODE_ENV || "development";
const DBclient = Knex(KnexConfig[evn]);

export default DBclient;

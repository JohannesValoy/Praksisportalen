import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable("sessions", (table) => {
        table.increments("id").primary();
        table.integer("userId").unsigned().notNullable();
        table.foreign("userId").references("id").inTable("users");
        table.string("sessionToken").notNullable().unique();
        table.timestamp("expires").notNullable();
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("sessions");
}


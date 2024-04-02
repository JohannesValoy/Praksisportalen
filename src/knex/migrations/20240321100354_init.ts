/** @format */

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table
        .enum("role", ["admin", "employee", "coordinator", "student"])
        .notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("accounts", (table) => {
      table.increments("id").primary();
      table.string("type").notNullable();
      table.string("provider").notNullable();
      table.string("providerAccountID").notNullable();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("id").inTable("users");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("departments", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.integer("employee_id").unsigned().notNullable();
      table.foreign("employee_id").references("id").inTable("users");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("sectionTypes", (table) => {
      table.string("name").primary();
    })
    .createTable("sections", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("section_type").notNullable();
      table.foreign("section_type").references("name").inTable("sectionTypes");
      table.integer("employee_id").unsigned().notNullable();
      table.foreign("employee_id").references("id").inTable("users");
      table.integer("department_id").unsigned().notNullable();
      table
        .foreign("department_id")
        .references("id")
        .inTable("departments")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("internshipFields", (table) => {
      table.string("name").primary();
    })
    .createTable("internships", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("internship_field").notNullable();
      table
        .foreign("internship_field")
        .references("name")
        .inTable("internshipFields");
      table.integer("maxCapacity").notNullable();
      table.integer("currentCapacity").defaultTo(0);
      table.integer("numberOfBeds").nullable();
      table.integer("yearOfStudy").notNullable();
      table.integer("section_id").unsigned().notNullable();
      table
        .foreign("section_id")
        .references("id")
        .inTable("sections")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("educationInstitutions", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("studyPrograms", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.integer("educationInstitution_id").unsigned().notNullable();
      table
        .foreign("educationInstitution_id")
        .references("id")
        .inTable("educationInstitutions");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("internshipAgreements", (table) => {
      table.increments("id").primary();
      table.string("status").notNullable();
      table.date("startDate").notNullable();
      table.date("endDate").notNullable();
      table.integer("student_id").unsigned();
      table
        .foreign("student_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("coordinator_id").unsigned();
      table.foreign("coordinator_id").references("id").inTable("users");
      table.integer("studyProgram_id").unsigned().notNullable();
      table
        .foreign("studyProgram_id")
        .references("id")
        .inTable("studyPrograms");
      table.integer("internship_id").unsigned().notNullable();
      table
        .foreign("internship_id")
        .references("id")
        .inTable("internships")
        .onDelete("CASCADE");
      table.string("comment").nullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("timeIntervals", (table) => {
      table.increments("id").primary();
      table.time("startTime").notNullable();
      table.time("endTime").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("accounts")
    .dropTableIfExists("departments")
    .dropTableIfExists("sections")
    .dropTableIfExists("internships")
    .dropTableIfExists("educationInstitutions")
    .dropTableIfExists("studyPrograms")
    .dropTableIfExists("internshipAgreements")
    .dropTableIfExists("timeIntervals")
    .dropTableIfExists("sectionTypes")
    .dropTableIfExists("internshipFields");
}

/** @format */

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("employees", (table) => {
      table.string("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table
        .enum("role", ["admin", "user"]).defaultTo("user").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("students", (table) => {
      table.string("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("coordinators", (table) => {
      table.string("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("departments", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("employee_id");
      table.foreign("employee_id").references("id").inTable("employees");
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
      table.string("employee_id").notNullable();
      table.foreign("employee_id").references("id").inTable("employees");
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
      table.string("student_id");
      table
        .foreign("student_id")
        .references("id")
        .inTable("students")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("coordinator_id");
      table.foreign("coordinator_id").references("id").inTable("coordinators");
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
    });
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("employees")
    .dropTableIfExists("students")
    .dropTableIfExists("coordinators")
    .dropTableIfExists("departments")
    .dropTableIfExists("sectionTypes")
    .dropTableIfExists("sections")
    .dropTableIfExists("internshipFields")
    .dropTableIfExists("internships")
    .dropTableIfExists("educationInstitutions")
    .dropTableIfExists("studyPrograms")
    .dropTableIfExists("internshipAgreements")
    .dropTableIfExists("timeIntervals");
}

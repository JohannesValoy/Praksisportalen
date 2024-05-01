import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("employees", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.enum("role", ["admin", "user"]).defaultTo("user").notNullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
    .createTable("departments", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("employeeID").nullable();
      table.foreign("employeeID").references("id").inTable("employees");
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
    .createTable("sectionTypes", (table) => {
      table.string("name").primary();
    })
    .createTable("sections", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("sectionType").nullable();
      table.foreign("sectionType").references("name").inTable("sectionTypes");
      table.string("employeeID").nullable();
      table.foreign("employeeID").references("id").inTable("employees");
      table.integer("departmentID").unsigned().notNullable();
      table
        .foreign("departmentID")
        .references("id")
        .inTable("departments")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
    .createTable("internshipFields", (table) => {
      table.string("name").primary();
    })
    .createTable("internships", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("internshipField").notNullable();
      table
        .foreign("internshipField")
        .references("name")
        .inTable("internshipFields");
      table.integer("maxCapacity").notNullable();
      table.integer("currentCapacity").defaultTo(0);
      table.integer("numberOfBeds").nullable();
      table.integer("yearOfStudy").notNullable();
      table.integer("sectionID").unsigned().notNullable();
      table
        .foreign("sectionID")
        .references("id")
        .inTable("sections")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
    .createTable("educationInstitutions", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
    .createTable("coordinators", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.integer("educationInstitutionID").unsigned().notNullable();
      table
        .foreign("educationInstitutionID")
        .references("id")
        .inTable("educationInstitutions");
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
    .createTable("students", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.integer("educationInstitutionID").unsigned().nullable();
      table
        .foreign("educationInstitutionID")
        .references("id")
        .inTable("educationInstitutions");
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
    .createTable("studyPrograms", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.integer("educationInstitutionID").unsigned().notNullable();
      table
        .foreign("educationInstitutionID")
        .references("id")
        .inTable("educationInstitutions");
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
    .createTable("internshipAgreements", (table) => {
      table.increments("id").primary();
      table.string("status").notNullable();
      table.date("startDate").notNullable();
      table.date("endDate").notNullable();
      table.string("studentID");
      table
        .foreign("studentID")
        .references("id")
        .inTable("students")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("coordinatorID");
      table.foreign("coordinatorID").references("id").inTable("coordinators");
      table.integer("studyProgramID").unsigned().notNullable();
      table.foreign("studyProgramID").references("id").inTable("studyPrograms");
      table.integer("internshipID").unsigned().notNullable();
      table
        .foreign("internshipID")
        .references("id")
        .inTable("internships")
        .onDelete("CASCADE");
      table.string("comment").nullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
    .createTable("internshipOrders", (table) => {
      table.increments("id").primary();
      table.integer("studyProgramID").unsigned().notNullable();
      table
        .foreign("studyProgramID")
        .references("id")
        .inTable("studyPrograms")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.text("comment").nullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
    })
    .createTable("fieldGroups", (table) => {
      table.increments("id").primary();
      table.string("internshipField").notNullable();
      table
        .foreign("internshipField")
        .references("name")
        .inTable("internshipFields");
      table.integer("internshipOrderID").unsigned().notNullable();
      table
        .foreign("internshipOrderID")
        .references("id")
        .inTable("internshipOrders")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("subFieldGroups", (table) => {
      table.increments("id").primary();
      table.integer("studyYear").notNullable();
      table.integer("numStudents").notNullable();
      table.timestamp("startWeek").notNullable();
      table.timestamp("endWeek").notNullable();
      table.integer("fieldGroupID").unsigned().notNullable();
      table
        .foreign("fieldGroupID")
        .references("id")
        .inTable("fieldGroups")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("timeIntervals", (table) => {
      table.increments("id").primary();
      table.timestamp("startDate").notNullable();
      table.timestamp("endDate").notNullable();
      table.integer("internshipAgreementID").unsigned().notNullable();
      table
        .foreign("internshipAgreementID")
        .references("id")
        .inTable("internshipAgreements");
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
    .createView("users", (view) => {
      view.as(
        knex
          .select("id", "name", "email", "role", "createdAt", "updatedAt")
          .from("employees")
          .union(
            knex.raw(
              'select id, name, email, "coordinator" as role, createdAt, updatedAt from coordinators',
            ),
          )
          .union(
            knex.raw(
              'select id, name, email, "student" as role, createdAt, updatedAt from students',
            ),
          ),
      );
    })
    .then(() => {
      //TODO: It works, but will cause a infinitely big loop whenever the database has 1B users. Very unlikely to happen, but still a problem.
      knex.raw(
        ` CREATE TRIGGER check_email_and_id 
            BEFORE INSERT ON employees, coordinators, students 
            FOR EACH ROW 
            BEGIN
              if exists (select 1 from users where email = NEW.email) then
                signal sqlstate '45999' set message_text = 'Email Already exist in user tables' ;
              end if
              while exists (select 1 from users where id = NEW.id) do
                set NEW.id = uuid();
              end while;
            END`,
      );
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
    .dropTableIfExists("timeIntervals")
    .dropTableIfExists("fieldGroups")
    .dropTableIfExists("subFieldGroups")
    .dropTableIfExists("internshipOrders")
    .dropViewIfExists("users");
}

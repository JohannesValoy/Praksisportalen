import type { Knex } from "knex";

const check_email_and_idTrigger = (table: string) => {
  return `CREATE TRIGGER checkEmailAndId${table.toUpperCase()} 
            BEFORE INSERT ON ${table} 

            FOR EACH ROW 
            BEGIN
              if exists(select 1 from users where email = NEW.email) then
                signal sqlstate '45999' set message_text = 'Email Already already exists' ;
              end if;
              while exists (select 1 from users where id = NEW.id) do
                set NEW.id = uuid();
              end while;
            END`;
};
/**
 * Migration to create the initial database schema.
 * @param knex The Knex instance.
 * @returns A promise that resolves when the schema is created.
 */
export async function up(knex: Knex): Promise<void> {
  return (
    knex.schema
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
        table.uuid("employeeID").nullable();
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
        table.uuid("employeeID").nullable();
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
        table.integer("maxCapacity").defaultTo(0).notNullable();
        table.integer("currentCapacity").notNullable().defaultTo(0);
        table.integer("numberOfBeds").notNullable().defaultTo(0);
        table
          .integer("yearOfStudy")
          .notNullable()
          .checkBetween([1, 5], "yearIsBetween");
        table.integer("sectionID").unsigned().notNullable();
        table
          .foreign("sectionID")
          .references("id")
          .inTable("sections")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
        table.check(
          "?? <= ??",
          ["currentCapacity", "maxCapacity"],
          "maxIsHigher",
        );
        table.check("?? >= 0", ["currentCapacity"], "currentIsPositive");
        table.check("?? >= 0", ["numberOfBeds"], "bedsIsPositive");
        table.check("?? >= 0", ["maxCapacity"], "maxCapacityIsPositive");
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
        table.integer("educationInstitutionID").unsigned().notNullable();
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
        table.date("startDate").notNullable();
        table.date("endDate").notNullable();
        table.uuid("studentID");
        table
          .foreign("studentID")
          .references("id")
          .inTable("students")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.uuid("coordinatorID").notNullable();
        table.foreign("coordinatorID").references("id").inTable("coordinators");
        table.integer("studyProgramID").unsigned().notNullable();
        table
          .foreign("studyProgramID")
          .references("id")
          .inTable("studyPrograms");
        table.integer("internshipID").unsigned().notNullable();
        table
          .foreign("internshipID")
          .references("id")
          .inTable("internships")
          .onDelete("CASCADE");
        table.string("comment").nullable();
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
        table.check("?? < ??", ["startDate", "endDate"]);
      })
      .createTable("internshipOrders", (table) => {
        table.increments("id").primary();
        table
          .enum("status", ["Finalized", "Pending"])
          .notNullable()
          .defaultTo("Pending");
        table.integer("studyProgramID").unsigned().notNullable();
        table.uuid("coordinatorID").notNullable();
        table.foreign("coordinatorID").references("id").inTable("coordinators");
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
        table.string("studyYear").notNullable();
        table.integer("numStudents").notNullable().checkPositive();
        table.integer("numStudentsAccepted").defaultTo(0);
        table.date("startWeek").notNullable();
        table.date("endWeek").notNullable();
        table.integer("fieldGroupID").unsigned().notNullable();
        table
          .foreign("fieldGroupID")
          .references("id")
          .inTable("fieldGroups")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.check("?? <= ??", ["startWeek", "endWeek"]);
        table.check(
          "?? >= 0",
          ["numStudentsAccepted"],
          "numStudentsAcceptedIsPositive",
        );
        table.check(
          "?? >= ??",
          ["numStudents", "numStudentsAccepted"],
          "AcceptedLessOrEqualThenStudents",
        );
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
        table.check("?? < ??", ["startDate", "endDate"]);
        table.check(
          "TIMESTAMPDIFF(HOUR, ??, ??) <= 12",
          ["startDate", "endDate"],
          "intervalIsLessThan12Hours",
        );
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
      .raw(check_email_and_idTrigger("employees"))
      .raw(check_email_and_idTrigger("students"))
      .raw(check_email_and_idTrigger("coordinators"))
      //TODO: Duplicate code for triggers, need to create a function or procedure
      .raw(
        `
      CREATE TRIGGER updateMaxCapacity
      BEFORE UPDATE ON internships
      FOR EACH ROW
      BEGIN
        IF OLD.maxCapacity < NEW.currentCapacity THEN
          SET NEW.maxCapacity = NEW.currentCapacity;
        END IF;
      END;
      `,
      )
      .raw(
        `
      CREATE TRIGGER orderBeforeNow
      BEFORE INSERT ON subFieldGroups
      FOR EACH ROW
      BEGIN
        IF NEW.startWeek <= NOW() THEN
         SIGNAL SQLSTATE '45000'
          SET MESSAGE_TEXT = 'Internship is full';
        END IF;
      END;
          `,
      )
      .raw(
        `
      CREATE TRIGGER maxNotLowerThenCurrent
      BEFORE INSERT ON internships
      FOR EACH ROW
      BEGIN
        IF NEW.maxCapacity < NEW.currentCapacity THEN
          SET NEW.maxCapacity = NEW.currentCapacity;
        END IF;
      END;
      `,
      )
      .raw(
        `
      CREATE FUNCTION IF NOT EXISTS availableInternshipsSpotsBetweenDates(internshipID INT, startWeek DATE, endWeek DATE) RETURNS INT
      DETERMINISTIC
      BEGIN
        DECLARE internCapacity INT;
        DECLARE internshipAgreementCount INT;
        SELECT currentCapacity INTO internCapacity FROM internships WHERE id = internshipID;
        SELECT COUNT(*) INTO internshipAgreementCount FROM internshipAgreements 
        WHERE internshipAgreements.internshipID = internshipID AND NOT (
            (startWeek < startDate AND endWeek < startDate) OR
            (startWeek > endDate AND endWeek > endDate)
          );
        RETURN internCapacity - internshipAgreementCount;
      END; 
      `,
      )
      //TODO: Also need triggers for update
      .raw(
        `CREATE TRIGGER hinderOverCapacity
      BEFORE INSERT ON internshipAgreements
      FOR EACH ROW
      BEGIN
        IF 0 > availableInternshipsSpotsBetweenDates(NEW.internshipID, NEW.startDate , NEW.endDate)  THEN
          SIGNAL SQLSTATE '45000'
          SET MESSAGE_TEXT = 'Internship is full';
        END IF;
      END
      `,
      )
      .raw(
        `
        CREATE TRIGGER hinderMultipleInternshipsAtTheSameTime
        BEFORE INSERT ON internshipAgreements
        FOR EACH ROW
        BEGIN
          IF NEW.studentID IS NOT NULL AND EXISTS (SELECT * FROM internshipAgreements WHERE studentID = NEW.studentID AND NOT (
            (NEW.startDate < startDate AND new.endDate < startDate) OR
            (NEW.startDate > endDate AND new.endDate > endDate)
          )) THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Student already has an internship at this time';
          END IF;
        END;
        `,
      )
      //TODO: Create a procedure or function to not need to copy the same code
      .raw(
        `
      CREATE TRIGGER checkDatesTimeIntervalsInsert
      BEFORE INSERT ON timeIntervals
      FOR EACH ROW
      BEGIN
        DECLARE startDateAgreement DATE;
        DECLARE endDateAgreement DATE;
        SELECT startDate, endDate INTO startDateAgreement, endDateAgreement FROM internshipAgreements WHERE id = NEW.internshipAgreementID;
        IF CAST(NEW.startDate AS DATE) < startDateAgreement OR CAST(NEW.endDate AS DATE) > endDateAgreement THEN
          SIGNAL SQLSTATE '45000'
          SET MESSAGE_TEXT = 'Time interval is outside of agreement';
        END IF;
      END;  
      `,
      )
      .raw(
        //With Help from GPT
        `
      CREATE TRIGGER checkNoOverlappingTimeIntervals
      BEFORE INSERT ON timeIntervals
      FOR EACH ROW
      BEGIN
        IF (EXISTS (
          SELECT 1 FROM timeIntervals
          WHERE internshipAgreementID = NEW.internshipAgreementID
          AND NOT (
            (NEW.startDate < startDate AND new.endDate < startDate) OR
            (NEW.startDate > endDate AND new.endDate > endDate)
          )
        )) THEN
          SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Time interval overlaps with another';
        END IF;
      END;
        `,
      )
      .raw(
        `      
      CREATE TRIGGER checkDatesTimeIntervalsUPDATE
      BEFORE UPDATE ON timeIntervals
      FOR EACH ROW
      BEGIN
        DECLARE startDateAgreement DATE;
        DECLARE endDateAgreement DATE;
        SELECT startDate, endDate INTO startDateAgreement, endDateAgreement FROM internshipAgreements WHERE id = NEW.internshipAgreementID;
        IF CAST(NEW.startDate AS DATE) < startDateAgreement OR CAST(NEW.endDate AS DATE) > endDateAgreement THEN
          SIGNAL SQLSTATE '45000'
          SET MESSAGE_TEXT = 'Time interval is outside of agreement';
        END IF;
      END; `,
      )
      .raw(
        `
      CREATE FUNCTION IF NOT EXISTS availableInternshipsSpots(internshipID INT) RETURNS INT
      DETERMINISTIC
      BEGIN
        DECLARE internCapacity INT;
        DECLARE internshipAgreementCount INT;
        SELECT currentCapacity INTO internCapacity FROM internships WHERE id = internshipID;
        SELECT COUNT(*) INTO internshipAgreementCount FROM internshipAgreements WHERE internshipAgreements.internshipID = internshipID AND NOW() BETWEEN startDate AND endDate;
        RETURN internCapacity - internshipAgreementCount;
      END; 
      `,
      )
  );
}
/**
 * Removes the initial database schema.
 * @param knex The Knex instance.
 * @returns A promise that resolves when the schema is removed.
 */
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

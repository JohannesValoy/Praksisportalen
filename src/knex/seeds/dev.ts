import { Knex } from "knex";
import Bun from "bun";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  await knex("timeIntervals").del();
  await knex("internshipAgreements").del();
  await knex("studyPrograms").del();
  await knex("educationInstitutions").del();
  await knex("internships").del();
  await knex("sections").del();
  await knex("departments").del();
  await knex("users").del();
  // Inserts seed entries
  await knex("users").insert([
    // Admins
    {
      id: 1,
      name: "Master Bob",
      email: "masterbob@dummy",
      password: await Bun.password.hash("123456", { algorithm: "bcrypt" }),
      role: "admin",
    },
    {
      email: "ann.berntsen@test.feide.no",
      name: "Ann Elg",
      role: "admin",
      password: "",
    },
    {
      id: 3,
      name: "Admin Jane",
      email: "adminjane@dummy",
      password: "123456",
      role: "admin",
    },

    // Employees
    {
      id: 1001,
      name: "John Doe",
      email: "johnDoe@dummy",
      password: "123456",
      role: "employee",
    },
    {
      id: 1002,
      name: "Bane bat",
      email: "baneBat@dummy",
      password: "123456",
      role: "employee",
    },
    {
      id: 1003,
      name: "Jane Smith",
      email: "janeSmith@dummy",
      password: "123456",
      role: "employee",
    },
    {
      id: 1004,
      name: "Michael Johnson",
      email: "michaelJohnson@dummy",
      password: "123456",
      role: "employee",
    },
    {
      id: 1005,
      name: "Sarah Brown",
      email: "sarahBrown@dummy",
      password: "123456",
      role: "employee",
    },

    // Coordinators
    {
      id: 2001,
      name: "Clark Kent",
      email: "clarkKent@dummy",
      password: "123456",
      role: "coordinator",
    },
    {
      id: 2002,
      name: "Bruce Wayne",
      email: "bruceWayne@dummy",
      password: "123456",
      role: "coordinator",
    },
    {
      id: 2003,
      name: "Diana Prince",
      email: "dianaPrince@dummy",
      password: "123456",
      role: "coordinator",
    },
    {
      id: 2004,
      name: "Barry Allen",
      email: "barryAllen@dummy",
      password: "123456",
      role: "coordinator",
    },
    {
      id: 2005,
      name: "Natasha Romanoff",
      email: "natashaRomanoff@dummy",
      password: "123456",
      role: "coordinator",
    },

    // Students
    {
      id: 3001,
      name: "Peter Parker",
      email: "peterParker@dummy",
      password: "123456",
      role: "student",
    },
    {
      id: 3002,
      name: "Tony Stark",
      email: "tonyStark@dummy",
      password: "123456",
      role: "student",
    },
    {
      id: 3003,
      name: "Wanda Maximoff",
      email: "wandaMaximoff@dummy",
      password: "123456",
      role: "student",
    },
    {
      id: 3004,
      name: "Steve Rogers",
      email: "steveRogers@dummy",
      password: "123456",
      role: "student",
    },
    {
      id: 3005,
      name: "Carol Danvers",
      email: "carolDanvers@dummy",
      password: "123456",
      role: "student",
    },
  ]);
  await knex("departments").insert([
    {
      id: 1,
      name: "Avdeling kirugi, Ålesund",
      employee_id: 1001,
    },
    {
      id: 2,
      name: "Volda sjukehus",
      employee_id: 1002,
    },
  ]);
  await knex("sections").insert([
    {
      id: 1,
      name: "Kirugisk sengepost",
      type: "Sengepost",
      employee_id: 1003,
      department_id: 1,
    },
    {
      id: 2,
      name: "Kirugisk poliklinikk",
      type: "Poliklinikk og dagbehandling",
      employee_id: 1004,
      department_id: 1,
    },
    {
      id: 3,
      name: "Akuttmottak",
      type: "Spesialseksjon",
      employee_id: 1005,
      department_id: 2,
    },
  ]);
  await knex("internships").insert([
    {
      id: 1,
      name: "Sjukepleiepraksis",
      field: "kirurgi",
      maxCapacity: 10,
      currentCapacity: 0,
      numberOfBeds: 10,
      yearOfStudy: 1,
      section_id: 1,
    },
    {
      id: 2,
      name: "Sjukepleiepraksis",
      field: "Kirurgi",
      maxCapacity: 10,
      currentCapacity: 0,
      numberOfBeds: 10,
      yearOfStudy: 2,
      section_id: 2,
    },
    {
      id: 3,
      name: "Sjukepleiepraksis",
      field: "Kirurgi",
      maxCapacity: 15,
      currentCapacity: 0,
      yearOfStudy: 3,
      section_id: 3,
    },
  ]);
  await knex("educationInstitutions").insert([
    {
      id: 1,
      name: "NTNU",
    },
    {
      id: 2,
      name: "HIMOLDE",
    },
  ]);
  await knex("studyPrograms").insert([
    {
      id: 1,
      name: "BA - Sykepleie",
      educationInstitution_id: 1,
    },
    {
      id: 2,
      name: "BA - Sykepleie",
      educationInstitution_id: 2,
    },
  ]);
  await knex("internshipAgreements").insert([
    {
      id: 1,
      student_id: 3001,
      internship_id: 1,
      studyProgram_id: 1,
      status: "Avtalt",
      startDate: new Date("2024-03-21"),
      endDate: new Date("2024-04-21"),
    },
    {
      id: 2,
      student_id: 3002,
      internship_id: 1,
      studyProgram_id: 1,
      status: "Avtalt",
      startDate: new Date("2024-03-21"),
      endDate: new Date("2024-04-21"),
    },
    {
      id: 3,
      student_id: 3003,
      internship_id: 2,
      studyProgram_id: 1,
      status: "Avtalt",
      startDate: new Date("2024-03-21"),
      endDate: new Date("2024-04-21"),
    },
    {
      id: 4,
      student_id: 3004,
      internship_id: 2,
      studyProgram_id: 1,
      status: "Avtalt",
      startDate: new Date("2024-03-21"),
      endDate: new Date("2024-04-21"),
    },
    {
      id: 5,
      student_id: 3005,
      internship_id: 3,
      studyProgram_id: 1,
      status: "Diskuteres",
      startDate: new Date("2024-05-01"),
      endDate: new Date("2024-06-01"),
    },
  ]);
  await knex("sectionTypes").insert([
    {
      name: "Sengepost",
    },
    {
      name: "Poliklinikk og dagbehandling",
    },
    {
      name: "Spesialseksjon",
    },
  ]);
  await knex("internshipFields").insert([
    {
      name: "Kirurgi",
    },
    {
      name: "Medisin",
    },
    {
      name: "Psykologi",
    },
  ]);
};

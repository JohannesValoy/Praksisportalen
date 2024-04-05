/** @format */

import { Knex } from "knex";
import { createEmployees } from "@/services/Employees";
import { createCoordinators } from "@/services/Coordinators";
import { createStudents } from "@/services/Student";
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
  await knex("internshipFields").del();
  await knex("sections").del();
  await knex("sectionTypes").del();
  await knex("departments").del();
  await knex("employees").del();
  await knex("students").del();
  await knex("coordinators").del();
  // Inserts seed entries
  await createEmployees([
    // Admins
    {
      name: "Master Bob",
      email: "masterbob@dummy",
      password: "123456",
      role: "admin",
    },
    {
      name: "Admin Jane",
      email: "adminjane@dummy",
      password: "123456",
      role: "admin",
    },

    // Employees
    {
      name: "John Doe",
      email: "johnDoe@dummy",
      password: "123456",
      role: "user",
    },
    {
      name: "Bane bat",
      email: "baneBat@dummy",
      password: "123456",
      role: "user",
    },
    {
      name: "Jane Smith",
      email: "janeSmith@dummy",
      password: "123456",
      role: "user",
    },
    {
      name: "Michael Johnson",
      email: "michaelJohnson@dummy",
      password: "123456",
      role: "user",
    },
    {
      name: "Sarah Brown",
      email: "sarahBrown@dummy",
      password: "123456",
      role: "user",
    }])

    await createCoordinators([
    // Coordinators
    {
      name: "Clark Kent",
      email: "clarkKent@dummy",
      password: "123456",
    },
    {

      name: "Bruce Wayne",
      email: "bruceWayne@dummy",
      password: "123456",
    },
    {

      name: "Diana Prince",
      email: "dianaPrince@dummy",
      password: "123456",
    },
    {
      name: "Barry Allen",
      email: "barryAllen@dummy",
      password: "123456",
    },
    {
      name: "Natasha Romanoff",
      email: "natashaRomanoff@dummy",
      password: "123456",
    }])

  await createStudents([
    // Students
    {
      name: "Peter Parker",
      email: "peterParker@dummy",
    },
    {
      name: "Tony Stark",
      email: "tonyStark@dummy",
    },
    {
      name: "Wanda Maximoff",
      email: "wandaMaximoff@dummy",
    },
    {
      name: "Steve Rogers",
      email: "steveRogers@dummy",
    },
    {
      name: "Carol Danvers",
      email: "carolDanvers@dummy",
    },
    {
      email: "ann.berntsen@test.feide.no",
      name: "Ann Elg",
    },
  ]);
  
  await knex("departments").insert([
    {
      id: 1,
      name: "Avdeling kirugi, Ålesund",
      employee_id: "3cfad1fde39871acfafe47f0267d51d35dcb8ec6144593746042a2fb37e0446e",
    },
    {
      id: 2,
      name: "Volda sjukehus",
      employee_id: "9d7463049c3e9f83b32202d2cf5cc6138ddc6dc18954ca83b9b7978d9cc83f96",
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
  await knex("sections").insert([
    {
      id: 1,
      name: "Kirugisk sengepost",
      section_type: "Sengepost",
      employee_id: "8b1827f72317504c1bb24b0f650f693c8c58565f4dd15d3c21aebe94751596c0",
      department_id: 1,
    },
    {
      id: 2,
      name: "Kirugisk poliklinikk",
      section_type: "Poliklinikk og dagbehandling",
      employee_id: "3dd150bdc63c3b5a68b20be5874ee6baff22265347c8068fe2abf3e5d6b09aaa",
      department_id: 1,
    },
    {
      id: 3,
      name: "Akuttmottak",
      section_type: "Spesialseksjon",
      employee_id: "8d84a7f9425688a9d39ba5ffb4fa842d4f239c8f89877e0e4c08a234008dc035",
      department_id: 2,
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
  await knex("internships").insert([
    {
      id: 1,
      name: "Sjukepleiepraksis",
      internship_field: "kirurgi",
      maxCapacity: 10,
      currentCapacity: 0,
      numberOfBeds: 10,
      yearOfStudy: 1,
      section_id: 1,
    },
    {
      id: 2,
      name: "Sjukepleiepraksis",
      internship_field: "Kirurgi",
      maxCapacity: 10,
      currentCapacity: 0,
      numberOfBeds: 10,
      yearOfStudy: 2,
      section_id: 2,
    },
    {
      id: 3,
      name: "Sjukepleiepraksis",
      internship_field: "Kirurgi",
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
      student_id: "5142c54115e167da37842bc61a210d0a21a6fc3e95ffe3f43ec979c5d5a9a267",
      internship_id: 1,
      studyProgram_id: 1,
      status: "Avtalt",
      startDate: new Date("2024-03-21"),
      endDate: new Date("2024-04-21"),
    },
    {
      id: 2,
      student_id: "ab2cbca3d7f1f8ca80eec22f6dcb8a00b04376fb66adf1e8cfa94b9d1c0fafcd",
      internship_id: 1,
      studyProgram_id: 1,
      status: "Avtalt",
      startDate: new Date("2024-03-21"),
      endDate: new Date("2024-04-21"),
    },
    {
      id: 3,
      student_id: "79f888584399f71d44fd55be246aa8d1347d0d9aa07c38c67de94d7abb4aa83f",
      internship_id: 2,
      studyProgram_id: 1,
      status: "Avtalt",
      startDate: new Date("2024-03-21"),
      endDate: new Date("2024-04-21"),
    },
    {
      id: 4,
      student_id: "79f888584399f71d44fd55be246aa8d1347d0d9aa07c38c67de94d7abb4aa83f",
      internship_id: 2,
      studyProgram_id: 1,
      status: "Avtalt",
      startDate: new Date("2024-04-21"),
      endDate: new Date("2024-04-28"),
    },
    {
      id: 5,
      student_id: "79f888584399f71d44fd55be246aa8d1347d0d9aa07c38c67de94d7abb4aa83f",
      internship_id: 3,
      studyProgram_id: 1,
      status: "Diskuteres",
      startDate: new Date("2024-05-01"),
      endDate: new Date("2024-06-01"),
    },
  ]);
};

/** @format */

import { Knex } from "knex";
import { createEmployees } from "@/services/EmployeeService";
import { createCoordinators } from "@/services/CoordinatorService";
import { createStudents } from "@/services/StudentService";
import JSONEmployees from "./employees-finished.json";
import JSONCoordinators from "./coordinators-finished.json";
import JSONStudents from "./students-finished.json";
import JSONStudies from "./studies-finished.json";
import JSONInstitutes from "./institutes-finished.json";
import JSONInternships from "./internships-finished.json";
import JSONSections from "./sections-finished.json";
import JSONDepartment from "./departments-finished.json";
import JSONInternshipAgreements from "./internshipAgreements-finished.json";
import { randomInt } from "crypto";

/**
 * Seeds the database with the data from the JSON files
 * @param knex The knex object
 * @returns A promise that resolves when the seeding is done
 */
export const seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  await knex("timeIntervals").del();
  await knex("internshipAgreements").del();
  await knex("studyPrograms").del();
  await knex("coordinators").del();
  await knex("educationInstitutions").del();
  await knex("internships").del();
  await knex("internshipFields").del();
  await knex("sections").del();
  await knex("sectionTypes").del();
  await knex("departments").del();
  await knex("employees").del();
  await knex("students").del();
  // Inserts seed entries

  await createEmployees([
    ...JSONEmployees,
    // Admins
    {
      id: "d4af0574-bee3-4436-b25c-6f452da4faa0",
      name: "Master Bob",
      email: "masterbob@dummy",
      password: "123456",
      role: "admin",
    },
    {
      id: "ea03f5d4-0bfe-422c-8e84-eec99e8f7ec0",
      name: "Admin Jane",
      email: "adminjane@dummy",
      password: "123456",
      role: "admin",
    },

    // Employees
    {
      id: "d4926208-8285-4bcd-91a3-f1ccab075e65",
      name: "John Doe",
      email: "johnDoe@dummy",
      password: "123456",
      role: "user",
    },
    {
      id: "fb55fd09-6cb4-4189-a711-28412ed9749a",
      name: "Bane bat",
      email: "baneBat@dummy",
      password: "123456",
      role: "user",
    },
    {
      id: "499e26d4-be1a-4f05-b35d-90fe3035c6be",
      name: "Jane Smith",
      email: "janeSmith@dummy",
      password: "123456",
      role: "user",
    },
    {
      id: "5b75e891-f0dc-4df2-b269-3bc463af87b3",
      name: "Michael Johnson",
      email: "michaelJohnson@dummy",
      password: "123456",
      role: "user",
    },
    {
      id: "f1e0b4f0-3e4b-4c8a-8f9e-2e5c5c7e7b7c",
      name: "Sarah Brown",
      email: "sarahBrown@dummy",
      password: "123456",
      role: "user",
    },
  ]);

  await knex("educationInstitutions").insert([...JSONInstitutes]);
  await createCoordinators([
    // Coordinators
    ...JSONCoordinators,
    {
      id: "7ac24c1b-956e-4daa-97b3-8d876080969d",
      name: "Clark Kent",
      email: "clarkKent@dummy",
      password: "123456",
      educationInstitution_id: 1,
    },
    {
      id: "98044060-fb7c-4e83-9b4f-2af8138b58d1",
      name: "Bruce Wayne",
      email: "bruceWayne@dummy",
      password: "123456",
      educationInstitution_id: 1,
    },
    {
      id: "b2080012-9cb7-4704-9d60-8dab059bcb52",
      name: "Diana Prince",
      email: "dianaPrince@dummy",
      password: "123456",
      educationInstitution_id: 1,
    },
    {
      id: "2d67d2f5-5f59-4415-b5e3-cb627603bbc8",
      name: "Barry Allen",
      email: "barryAllen@dummy",
      password: "123456",
      educationInstitution_id: 2,
    },
    {
      id: "fcfa7bcb-0cd0-4fa8-a2fc-f86521f12285",
      name: "Natasha Romanoff",
      email: "natashaRomanoff@dummy",
      password: "123456",
      educationInstitution_id: 2,
    },
  ]);

  await createStudents([
    ...JSONStudents,
    // Students
    {
      id: "ad4efb91-9f9a-4ede-9423-a4522ea329cd",
      name: "Peter Parker",
      email: "peterParker@dummy",
    },
    {
      id: "eaf3851e-6bf3-433f-bdd5-dfc891852edd",
      name: "Tony Stark",
      email: "tonyStark@dummy",
    },
    {
      id: "8daff6c7-fb9b-4bfa-b4f1-76f92d5ad857",
      name: "Wanda Maximoff",
      email: "wandaMaximoff@dummy",
    },
    {
      id: "83040eee-f982-4b22-b9d9-63644a122dcf",
      name: "Steve Rogers",
      email: "steveRogers@dummy",
    },
    {
      id: "4657c035-9949-4b5d-8a5a-6e1720b9ecf6",
      name: "Carol Danvers",
      email: "carolDanvers@dummy",
    },
    {
      id: "ca8917c8-406b-4f53-a4a9-92082865ea9a",
      email: "ann.berntsen@test.feide.no",
      name: "Ann Elg",
    },
  ]);

  await knex("departments").insert([...JSONDepartment]);
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
  await knex("sections").insert(JSONSections);
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
    { name: "Fysioterapi" },
  ]);
  await knex("internships").insert(JSONInternships);
  await knex("studyPrograms").insert(JSONStudies);

  const internships = [];

  JSONInternshipAgreements.forEach((agreement) => {
    const direction = Math.random() > 0.5 ? 1 : -1;
    const offset = Math.floor(Math.random() * 6);

    const offset2 = agreement.student_id
      ? internships.filter(
          (i) =>
            i.student_id === agreement.student_id &&
            (direction === 1
              ? i.startDate >= Date.now()
              : i.startDate <= Date.now())
        ).length * 2
      : 0;
    const dates = [new Date(), new Date()];
    dates[0].setDate(dates[0].getDate() + direction * (offset + offset2 * 14));
    dates[1].setDate(
      dates[1].getDate() + direction * (offset + (offset2 + 1) * 14)
    );
    dates.sort((a, b) => a.getTime() - b.getTime());
    internships.push({
      ...agreement,
      startDate: new Date(dates[0]),
      endDate: new Date(dates[1]),
    });
  });

  await knex("internshipAgreements").insert(internships);

  const timeIntervals = [];
  internships.forEach((internship) => {
    const startDate: Date = internship.startDate;
    const endDate: Date = internship.endDate;
    const weeklyPracticeDays = 2;
    const sameSectionInternships = internships.filter(
      (inter) => inter.section_id === internship.section_id
    );
    while (startDate.getTime() < endDate.getTime()) {
      const daysInTheWeek = [];
      while (
        startDate.getDay() !== 6 &&
        startDate.getTime() < endDate.getTime()
      ) {
        //Ignore saturdays
        if (startDate.getDay() !== 5) {
          daysInTheWeek.push(new Date(startDate));
        }
        startDate.setDate(startDate.getDate() + 1);
      }
      startDate.setDate(startDate.getDate() + 1);
      let days: Date[] = daysInTheWeek.toSorted((a, b) =>
        differenceInBusyness(a, b, sameSectionInternships, timeIntervals)
      );
      if (days.length > weeklyPracticeDays) {
        days = [days[0], days[randomInt(1, days.length - 1)]];
      }
      for (const day of days) {
        day.setHours(8);
        day.setMinutes(0);
        day.setSeconds(0);
        const endIntervalDate = new Date(day);
        endIntervalDate.setHours(16);
        timeIntervals.push({
          startDate: day,
          endDate: endIntervalDate,
          internshipAgreement_id: internship.id,
        });
      }
    }
  });
  await knex("timeIntervals").insert(timeIntervals);
};
/**
 * A function that calculates the different between two dates within a section of internship agreements
 * @param a Date a
 * @param b Date b
 * @param sameSectionInternships The internships that are in the same section
 * @param timeIntervals Time intervals that are already created
 * @returns The difference in busyness
 */
function differenceInBusyness(
  a: any,
  b: any,
  sameSectionInternships: any[],
  timeIntervals: any[]
) {
  return (
    timeIntervals.filter((ti) => {
      return (
        (sameSectionInternships.includes(ti.internshipAgreement_id) &&
          ti.startDate > a &&
          ti.startDate < a) ||
        (ti.endDate > a && ti.endDate < a)
      );
    }).length -
    timeIntervals.filter((ti) => {
      return (
        (sameSectionInternships.includes(ti.internshipAgreement_id) &&
          ti.startDate < b &&
          ti.endDate > b) ||
        (ti.startDate < b && ti.endDate > b)
      );
    }).length
  );
}

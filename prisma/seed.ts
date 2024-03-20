import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const environment = process.argv[2] || "development";

  switch (environment) {
    case "development":
      if ((await prisma.coordinator.count()) === 0) {
        await prisma.coordinator.createMany({
          data: [
            {
              name: "Liam Baker",
              email: "liamBak@test.com",
              password: "liam1234",
            },
            {
              name: "Emma Wright",
              email: "emmaWri@test.com",
              password: "emma1234",
            },
            {
              name: "Noah Young",
              email: "noahYou@test.com",
              password: "noah1234",
            },
            {
              name: "Oliver Turner",
              email: "oliverTur@test.com",
              password: "oliver1234",
            },
            {
              name: "Amelia Campbell",
              email: "ameliaCam@test.com",
              password: "amelia1234",
            },
            {
              name: "Benjamin Mitchell",
              email: "benjaminMit@test.com",
              password: "benjamin1234",
            },
            {
              name: "Aria Morgan",
              email: "ariaMor@test.com",
              password: "aria1234",
            },
            {
              name: "Mason King",
              email: "masonKin@test.com",
              password: "mason1234",
            },
          ],
        });
      } else {
        console.log("Coordinator already exists");
      }
      if ((await prisma.candidate.count()) === 0) {
        await prisma.candidate.createMany({
          data: [
            {
              id: "1",
              name: "Ethan Wilson",
              email: "ethanWil@test.com",
              password: "ethan1234",
            },
            {
              id: "2",
              name: "Isabella Anderson",
              email: "isabellaAnd@test.com",
              password: "isabella1234",
            },
            {
              id: "3",
              name: "James Martinez",
              email: "jamesMar@test.com",
              password: "james1234",
            },
            {
              id: "4",
              name: "Ava Rodriguez",
              email: "avaRod@test.com",
              password: "ava1234",
            },
            {
              id: "5",
              name: "Alexander Hernandez",
              email: "alexanderHer@test.com",
              password: "alexander1234",
            },
            {
              id: "6",
              name: "Mia Lopez",
              email: "miaLop@test.com",
              password: "mia1234",
            },
            {
              id: "7",
              name: "William Perez",
              email: "williamPer@test.com",
              password: "william1234",
            },
            {
              id: "8",
              name: "Charlotte Gonzalez",
              email: "charlotteGon@test.com",
              password: "charlotte1234",
            },
            {
              id: "9",
              name: "Sophie Ward",
              email: "sophieWar@test.com",
              password: "sophie1234",
            },
            {
              id: "10",
              name: "Lucas Cooper",
              email: "lucasCoo@test.com",
              password: "lucas1234",
            },
          ],
        });
      } else {
        console.log("Candidate already exists");
      }
      if ((await prisma.leader.count()) === 0) {
        await prisma.leader.createMany({
          data: [
            {
              name: "Bob Marley",
              email: "BobMar@test.com",
              password: "bob1234",
              id: "1",
            },

            {
              name: "Alice Smith",
              email: "aliceSmi@test.com",
              password: "alice1234",
              id: "2",
            },
            {
              name: "Bob Johnson",
              email: "bobJoh@test.com",
              password: "bob1234",
              id: "3",
            },
            {
              name: "Alice Johnson",
              email: "aliceJoh@test.com",
              password: "alice1234",
              id: "4",
            },
            {
              name: "John Smith",
              email: "johnSmi@test.com",
              password: "john1234",
              id: "5",
            },
            {
              name: "Sarah Johnson",
              email: "sarahJoh@test.com",
              password: "sarah1234",
              id: "6",
            },
            {
              name: "Michael Smith",
              email: "michaelSmi@test.com",
              password: "michael1234",
              id: "7",
            },
            {
              name: "Emily Davis",
              email: "emilyDav@test.com",
              password: "emily1234",
              id: "8",
            },
            {
              name: "David Johnson",
              email: "davidJoh@test.com",
              password: "david1234",
              id: "9",
            },
            {
              name: "Olivia Smith",
              email: "oliviaSmi@test.com",
              password: "olivia1234",
              id: "10",
            },
            {
              name: "Daniel Brown",
              email: "danielBro@test.com",
              password: "daniel1234",
              id: "11",
            },
            {
              name: "Sophia Taylor",
              email: "sophiaTay@test.com",
              password: "sophia1234",
              id: "12",
            },
          ],
        });
      } else {
        console.log("Leader already exists");
      }
      if ((await prisma.department.count()) === 0) {
        await prisma.department.createMany({
          data: [
            {
              name: "Avdeling for kreft",
              id: "1",
              leaderID: "1",
            },
            {
              name: "Avdeling for psykisk helse",
              id: "2",
              leaderID: "3",
            },
            {
              name: "Avdeling for medisin",
              id: "3",
              leaderID: "5",
            },
          ],
        });
      } else {
        console.log("Department already exists");
      }
      if ((await prisma.section.count()) === 0) {
        await prisma.section.createMany({
          data: [
            {
              name: "Sektor for kreft",
              id: "1",
              departmentID: "1",
              leaderID: "2",
            },
            {
              name: "Sektor for krefthelse",
              id: "2",
              departmentID: "1",
              leaderID: "4",
            },
            {
              name: "Sektor for sjukepleie",
              id: "3",
              departmentID: "1",
              leaderID: "6",
            },
            {
              name: "Sektor for psykisk helse",
              id: "4",
              departmentID: "2",
              leaderID: "7",
            },
            {
              name: "Sektor for psykisk helsehjelp",
              id: "5",
              departmentID: "2",
              leaderID: "8",
            },
            {
              name: "Sektor for psykisk helsearbeid",
              id: "6",
              departmentID: "2",
              leaderID: "9",
            },
            {
              name: "Sektor for medisin",
              id: "7",
              departmentID: "3",
              leaderID: "10",
            },
            {
              name: "Sektor for medisinsk helse",
              id: "8",
              departmentID: "3",
              leaderID: "11",
            },
            {
              name: "Sektor for medisinsk helsearbeid",
              id: "9",
              departmentID: "3",
              leaderID: "12",
            },
          ],
        });
      } else {
        console.log("Section already exists");
      }
      if ((await prisma.internship.count()) === 0) {
        await prisma.internship.createMany({
          data: [
            {
              id: "1",
              name: "Kreftpraksis",
              sectionID: "1",
              maxCapacity: 10,
              currentCapacity: 0,
              numberOfBeds: 5,
              field: "Kreft",
              yearOfStudy: 2,
            },
            {
              id: "2",
              name: "Kreftpraksis 2",
              sectionID: "1",
              maxCapacity: 15,
              currentCapacity: 0,
              numberOfBeds: 5,
              field: "Krefthelse",
              yearOfStudy: 2,
            },
            {
              id: "3",
              name: "Kreftpraksis 3",
              sectionID: "2",
              maxCapacity: 10,
              currentCapacity: 0,
              numberOfBeds: 5,
              field: "Sjukepleie",
              yearOfStudy: 3,
            },
            {
              id: "4",
              name: "Psykisk helsepraksis",
              sectionID: "2",
              maxCapacity: 20,
              currentCapacity: 0,
              numberOfBeds: 5,
              field: "Psykisk helse",
              yearOfStudy: 1,
            },
            {
              id: "5",
              name: "Psykisk helsepraksis 2",
              sectionID: "3",
              maxCapacity: 20,
              currentCapacity: 0,
              numberOfBeds: 5,
              field: "Psykisk helsehjelp",
              yearOfStudy: 2,
            },
            {
              id: "6",
              name: "Psykisk helsepraksis 3",
              sectionID: "3",
              maxCapacity: 20,
              currentCapacity: 0,
              numberOfBeds: 5,
              field: "Psykisk helsearbeid",
              yearOfStudy: 1,
            },
            {
              id: "7",
              name: "Medisinpraksis",
              sectionID: "4",
              maxCapacity: 10,
              currentCapacity: 0,
              numberOfBeds: 5,
              field: "Medisin",
              yearOfStudy: 3,
            },
            {
              id: "8",
              name: "Medisinpraksis 2",
              sectionID: "4",
              maxCapacity: 15,
              currentCapacity: 0,
              numberOfBeds: 5,
              field: "Medisinsk helse",
              yearOfStudy: 2,
            },
            {
              id: "9",
              name: "Medisinpraksis 3",
              sectionID: "5",
              maxCapacity: 10,
              currentCapacity: 0,
              numberOfBeds: 5,
              field: "Medisinsk helsearbeid",
              yearOfStudy: 3,
            },
          ],
        });
      } else {
        console.log("Internship already exists");
      }
      if ((await prisma.educationInstitute.count()) === 0) {
        await prisma.educationInstitute.createMany({
          data: [
            {
              id: "1",
              name: "NTNU",
            },
            {
              id: "2",
              name: "UiO",
            },
            {
              id: "3",
              name: "UiB",
            },
            {
              id: "4",
              name: "UiT",
            },
            {
              id: "5",
              name: "UiA",
            },
            {
              id: "6",
              name: "UiS",
            },
            {
              id: "7",
              name: "NMBU",
            },
            {
              id: "8",
              name: "HiOA",
            },
            {
              id: "9",
              name: "HiMolde",
            },
            {
              id: "10",
              name: "HiVolda",
            },
          ],
        });
      } else {
        console.log("Education Institute already exists");
      }
      if ((await prisma.studyProgram.count()) === 0) {
        await prisma.studyProgram.createMany({
          data: [
            {
              id: "1",
              name: "Sykepleie",
              instituteID: "1",
            },
            {
              id: "2",
              name: "Psykisk helsearbeid",
              instituteID: "1",
            },
            {
              id: "3",
              name: "Medisin",
              instituteID: "1",
            },
            {
              id: "4",
              name: "Sykepleie",
              instituteID: "2",
            },
            {
              id: "5",
              name: "Psykisk helsearbeid",
              instituteID: "2",
            },
            {
              id: "6",
              name: "Medisin",
              instituteID: "2",
            },
            {
              id: "7",
              name: "Sykepleie",
              instituteID: "3",
            },
            {
              id: "8",
              name: "Psykisk helsearbeid",
              instituteID: "3",
            },
            {
              id: "9",
              name: "Medisin",
              instituteID: "3",
            },
            {
              id: "10",
              name: "Sykepleie",
              instituteID: "4",
            },
            {
              id: "11",
              name: "Psykisk helsearbeid",
              instituteID: "4",
            },
            {
              id: "12",
              name: "Medisin",
              instituteID: "4",
            },
            {
              id: "13",
              name: "Sykepleie",
              instituteID: "5",
            },
            {
              id: "14",
              name: "Psykisk helsearbeid",
              instituteID: "5",
            },
            {
              id: "15",
              name: "Medisin",
              instituteID: "5",
            },
            {
              id: "16",
              name: "Sykepleie",
              instituteID: "6",
            },
            {
              id: "17",
              name: "Psykisk helsearbeid",
              instituteID: "6",
            },
            {
              id: "18",
              name: "Medisin",
              instituteID: "6",
            },
            {
              id: "19",
              name: "Sykepleie",
              instituteID: "7",
            },
            {
              id: "20",
              name: "Psykisk helsearbeid",
              instituteID: "7",
            },
            {
              id: "21",
              name: "Medisin",
              instituteID: "7",
            },
            {
              id: "22",
              name: "Sykepleie",
              instituteID: "8",
            },
            {
              id: "23",
              name: "Psykisk helsearbeid",
              instituteID: "8",
            },
            {
              id: "24",
              name: "Medisin",
              instituteID: "8",
            },
            {
              id: "25",
              name: "Sykepleie",
              instituteID: "9",
            },
            {
              id: "26",
              name: "Psykisk helsearbeid",
              instituteID: "9",
            },
            {
              id: "27",
              name: "Medisin",
              instituteID: "9",
            },
            {
              id: "28",
              name: "Sykepleie",
              instituteID: "10",
            },
            {
              id: "29",
              name: "Psykisk helsearbeid",
              instituteID: "10",
            },
            {
              id: "30",
              name: "Medisin",
              instituteID: "10",
            },
          ],
        });
      } else {
        console.log("Study Program already exists");
      }
      if ((await prisma.internshipAgreement.count()) === 0) {
        await prisma.internshipAgreement.createMany({
          data: [
            {
              id: "1",
              coordinatorID: "2",
              candidateID: "1",
              internshipID: "1",
              status: "Approved",
              startDate: new Date("2024-05-01"),
              endDate: new Date("2024-06-01"),
              comments: "Approved",
            },
            {
              id: "2",
              coordinatorID: "2",
              candidateID: "2",
              internshipID: "1",
              status: "Approved",
              startDate: new Date("2024-05-01"),
              endDate: new Date("2024-06-01"),
              comments: "Approved",
            },
            {
              id: "3",
              coordinatorID: "4",
              candidateID: "3",
              internshipID: "2",
              status: "Approved",
              startDate: new Date("2022-05-01"),
              endDate: new Date("2022-06-01"),
              comments: "Approved",
            },
            {
              id: "4",
              coordinatorID: "4",
              candidateID: "4",
              internshipID: "2",
              status: "Approved",
              startDate: new Date("2022-05-01"),
              endDate: new Date("2022-06-01"),
              comments: "Approved",
            },
            {
              id: "5",
              coordinatorID: "6",
              candidateID: "5",
              internshipID: "3",
              status: "Approved",
              startDate: new Date("2023-05-01"),
              endDate: new Date("2023-06-01"),
              comments: "Approved",
            },
            {
              id: "6",
              coordinatorID: "6",
              candidateID: "6",
              internshipID: "3",
              status: "Approved",
              startDate: new Date("2023-05-01"),
              endDate: new Date("2023-06-01"),
              comments: "Approved",
            },
          ],
        });
      } else {
        console.log("Internship Agreement already exists");
      }
    case "test":
      /** data for your test environment */

      break;
    default:
      console.log(
        `${environment} is a wrong environment. Please use development or test.`
      );
      break;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });

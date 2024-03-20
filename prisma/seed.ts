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
              name: "Ethan Wilson",
              email: "ethanWil@test.com",
              password: "ethan1234",
            },
            {
              name: "Isabella Anderson",
              email: "isabellaAnd@test.com",
              password: "isabella1234",
            },
            {
              name: "James Martinez",
              email: "jamesMar@test.com",
              password: "james1234",
            },
            {
              name: "Ava Rodriguez",
              email: "avaRod@test.com",
              password: "ava1234",
            },
            {
              name: "Alexander Hernandez",
              email: "alexanderHer@test.com",
              password: "alexander1234",
            },
            {
              name: "Mia Lopez",
              email: "miaLop@test.com",
              password: "mia1234",
            },
            {
              name: "William Perez",
              email: "williamPer@test.com",
              password: "william1234",
            },
            {
              name: "Charlotte Gonzalez",
              email: "charlotteGon@test.com",
              password: "charlotte1234",
            },
            {
              name: "Sophie Ward",
              email: "sophieWar@test.com",
              password: "sophie1234",
            },
            {
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
            },

            {
              name: "Alice Smith",
              email: "aliceSmi@test.com",
              password: "alice1234",
            },
            {
              name: "Bob Johnson",
              email: "bobJoh@test.com",
              password: "bob1234",
            },
            {
              name: "Alice Johnson",
              email: "aliceJoh@test.com",
              password: "alice1234",
            },
            {
              name: "John Smith",
              email: "johnSmi@test.com",
              password: "john1234",
            },
            {
              name: "Sarah Johnson",
              email: "sarahJoh@test.com",
              password: "sarah1234",
            },
            {
              name: "Michael Smith",
              email: "michaelSmi@test.com",
              password: "michael1234",
            },
            {
              name: "Emily Davis",
              email: "emilyDav@test.com",
              password: "emily1234",
            },
            {
              name: "David Johnson",
              email: "davidJoh@test.com",
              password: "david1234",
            },
            {
              name: "Olivia Smith",
              email: "oliviaSmi@test.com",
              password: "olivia1234",
            },
            {
              name: "Daniel Brown",
              email: "danielBro@test.com",
              password: "daniel1234",
            },
            {
              name: "Sophia Taylor",
              email: "sophiaTay@test.com",
              password: "sophia1234",
            },
          ],
        });
      } else {
        console.log("Leader already exists");
      }
      if ((await prisma.educationInstitute.count()) === 0) {
        await prisma.educationInstitute.createMany({
          data: [
            {
              name: "NTNU",
            },
          ],
        });
      } else {
        console.log("Education Institute already exists");
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

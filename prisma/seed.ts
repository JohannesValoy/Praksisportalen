import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const environment = process.argv[2] || "development";

    switch (environment) {
        case "development":
            if (await prisma.coordinator.count() === 0) {
                await prisma.coordinator.createMany({
                    data: [
                        {
                            name: "John Doe",
                            email: "Hello@world",
                            password: "",
                        },
                        {
                            name: "Jane Doe",
                            email: "Word@hello",
                            password: "",
                        },
                    ],
                });
            } else {
                console.log("Coordinator already exists");
            }
            if (await prisma.candidate.count() === 0) {
                await prisma.candidate.createMany({
                    data: [
                        {
                            name: "John Doe stud",
                            email: "Testing@hello",
                            password: "",
                        },
                        {
                            name: "Jane Doe stud",
                            email: "Hello@testing",
                            password: "",
                        },
                    ],
                });
            } else {
                console.log("Candidate already exists");
            }
            
            break;

        case "test":
            /** data for your test environment */

            break;
        default:
            console.log(`${environment} is a wrong environment. Please use development or test.`)
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

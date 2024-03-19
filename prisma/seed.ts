import { parseArgs } from "util";
import prisma from "@/app/module/prismaClient";

async function main() {
    const {
        values: { environment },
    } = parseArgs({
        args: Bun.argv,
        options: {
            environment: { type: "string" },
        },
    });

    switch (environment) {
        case "development":
            /** data for your development environment */
            
            break;

        case "test":
            /** data for your test environment */

            break;
        default:
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

import NextAuth from "next-auth"
import KnexAdapter from "./_adapter/dbadapter"
import DBclient from "@/knex/config/DBClient"
import passwordProvider from "./_providers/PasswordProvider"
import feideProvider from "./_providers/feide"

const  handler = NextAuth({
    providers: [passwordProvider, feideProvider
    ],
    session: {
        strategy: "jwt",
    },
    pages: {    },
    adapter: KnexAdapter(DBclient),
    }
)

export{handler as GET, handler as POST}
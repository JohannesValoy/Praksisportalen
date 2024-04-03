import NextAuth, { NextAuthOptions } from "next-auth";
import KnexAdapter from "./_adapter/dbadapter";
import DBclient from "@/knex/config/DBClient";
import passwordProvider from "./_providers/PasswordProvider";
import feideProvider from "./_providers/feide";

export const authoptions : NextAuthOptions = {
  providers: [passwordProvider, feideProvider],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: { signIn: "/login", signOut: "/logout"},
  adapter: KnexAdapter(DBclient),
  callbacks: {
    async jwt({token, user, }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({session, token}) {
      console.log("Session invoked");
      console.log(session, token)
      if (token && session.user) {
        session.user.role = token.role
      }
      return session;
    },
  },
}

const handler = NextAuth(authoptions);

export { handler as GET, handler as POST };

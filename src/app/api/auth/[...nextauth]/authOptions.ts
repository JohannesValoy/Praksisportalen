import { NextAuthOptions } from "next-auth";
import passwordProvider from "./_providers/PasswordProvider";
import feideProvider from "./_providers/feide";
import DBclient from "@/knex/config/DBClient";
import KnexAdapter from "./_adapter/dbadapter";

export const authoptions: NextAuthOptions = {
  providers: [passwordProvider, feideProvider],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: { signIn: "/login", signOut: "/" },
  adapter: KnexAdapter(DBclient),
  callbacks: {
    async jwt({ token, user }) {
      token.email = undefined;
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export default authoptions;

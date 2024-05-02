/** @format */

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
      if (user) {
        token.email = undefined;
        token.name = undefined;
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

export default authoptions;

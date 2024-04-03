/** @format */

import DBclient from "@/knex/config/DBClient";
import type { UserTable } from "knex/types/tables.js";
import CredentialsProvider from "next-auth/providers/credentials";
import { fromUserToUserAdapter } from "../_adapter/dbadapter";
import bcrypt from "bcrypt";
import { User } from "next-auth";

const passwordProvider = CredentialsProvider({
  // The name to display on the sign in form (e.g. 'Sign in with...')
  name: "Credentials",
  // The credentials is used to generate a suitable form on the sign in page.
  // You can specify whatever fields you are expecting to be submitted.
  // e.g. domain, username, password, 2FA token, etc.
  // You can pass any HTML attribute to the <input> tag through the object.
  credentials: {
    username: { label: "Username", type: "text", placeholder: "jsmith" },
    password: { label: "Password", type: "password" },
  },
  id: "cred",
  async authorize(credentials, req) : Promise<User> {
    const username = credentials?.username;
    if (username == undefined) {
      return null;
    }
    const user = await DBclient.from<UserTable>("users")
      .where("email", username)
      .first();
    const password = credentials?.password;
    if (user == undefined || password == undefined) {
      throw new Error("User not found");
    }
    return (await bcrypt.compareSync(String(password), user.password))
      ? fromUserToUserAdapter(user)
      : null;
  },
});

export default passwordProvider;

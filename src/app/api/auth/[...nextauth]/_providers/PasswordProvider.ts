/** @format */

import DBclient from "@/knex/config/DBClient";
import type { CoordinatorTable } from "knex/types/tables.js";
import CredentialsProvider from "next-auth/providers/credentials";
import { fromUserToUserAdapter } from "../_adapter/dbadapter";
import bcrypt from "bcrypt";
import { User } from "next-auth";
import { Role } from "../nextauth";
import { Employee } from "@/app/_models/Employee";

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
  async authorize(credentials, req): Promise<User> {
    const username = credentials?.username;
    let role = undefined;
    if (!username) {
      return null;
    }
    // We are going to say it as a CoordinatorTable as it contains only the password field
    let user = await DBclient.from<Employee>("employees")
      .where("email", username)
      .first();
    if (!user) {
      user = {
        ...(await DBclient.from<CoordinatorTable>("coordinators")
          .where("email", username)
          .first()),
        role: Role.coordinator,
      };
    }
    const password = credentials?.password;
    if (!user || !password) {
      throw new Error("User not found");
    }
    return (await bcrypt.compareSync(String(password), user.password))
      ? fromUserToUserAdapter({
          id: user.id,
          email: user.email,
          name: user.name,
          role: Object.hasOwn(user, "role")
            ? (user.role as Role)
            : Role.coordinator,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        })
      : null;
  },
});

export default passwordProvider;

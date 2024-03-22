import { Knex } from "knex";
import type { User } from "knex/types/tables.js";
import { Account } from "next-auth";
import {
  Adapter,
  AdapterUser,
  AdapterAccount,
  AdapterSession,
} from "next-auth/adapters";
export default function MyAdapter(client: Knex): Adapter {
  return {
    async createUser(user): Promise<AdapterUser> {
      throw new Error("Method not implemented.");
      return;
    },
    async getUser(id): Promise<AdapterUser | null> {
      return Promise.resolve(
        client.select().from("users").where("id", id)
      ).then<AdapterUser | null>((results) => {
        const user = results.length > 0 ? results[0] || null : null;
        return user == null ? null : fromUsertoUserAdapter(user);
      });
    },
    async getUserByEmail(email): Promise<AdapterUser | null> {
      return Promise.resolve(
        client.select().from("users").where("email", email)
      ).then<AdapterUser | null>((results) => {
        const user = results.length > 0 ? results[0] || null : null
        return user == null ? null : fromUsertoUserAdapter(user);
      });
    },
    async getUserByAccount({
      providerAccountId,
      provider,
    }): Promise<AdapterUser | null> {
      return Promise.resolve(
        client
          .select("id")
          .from("accounts")
          .where("providerAccountId", providerAccountId)
          .andWhere("provider", provider)
      )
        .then<User[] | null>((results) => {
          const user_id = results || null;
          if (user_id == null) return null;
          return Promise.resolve(
            client.select().from("users").where("id", user_id)
          );
        })
        .then<AdapterUser | null>((results) => {
          const user = results == null ? null : results[0] || null;
          return user == null ? null : fromUsertoUserAdapter(user);
        });
    },
    async updateUser(user) {
      return;
    },
    async deleteUser(userId) {
      return;
    },
    async linkAccount(account) {
      return;
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return;
    },
    async createSession({ sessionToken, userId, expires }) {
      return;
    },
    async getSessionAndUser(sessionToken) {
      return;
    },
    async updateSession({ sessionToken }) {
      return;
    },
    async deleteSession(sessionToken) {
      return;
    },
    async createVerificationToken({ identifier, expires, token }) {
      return;
    },
    async useVerificationToken({ identifier, token }) {
      return;
    },
  };
}

function fromUsertoUserAdapter(user: User): AdapterUser {
  return {
    id: user.id.toString(),
    name: user.name,
    email: user.email,
    image: null,
    emailVerified: null,
  };
}

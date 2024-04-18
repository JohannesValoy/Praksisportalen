/** @format */

import DBclient from "@/knex/config/DBClient";
import { Knex } from "knex";
import { UserAttributes } from "knex/types/tables.js";
import { Adapter, AdapterUser, AdapterSession } from "next-auth/adapters";
import { Role } from "../nextauth";
export default function KnexAdapter(client: Knex): Adapter {
  return {
    async createUser(user): Promise<AdapterUser> {
      throw new Error("Method not implemented.");
      return;
    },
    async getUser(id): Promise<AdapterUser | null> {
      return Promise.allSettled([
        client.select().from("users").where("id", id).first(),
      ]).then<AdapterUser | null>((results) => {
        const users = results
          .filter((result) => result.status === "fulfilled")
          .map(
            (result) => (result as PromiseFulfilledResult<RealUserTable>).value
          )
          .filter((user) => user != null);
        const user = results.length > 0 ? users[0] || null : null;
        return user == null ? null : fromUserToUserAdapter(user);
      });
    },
    async getUserByEmail(email): Promise<AdapterUser | null> {
      return Promise.allSettled([
        client.select().from("users").where("email", email).first(),
      ]).then<AdapterUser | null>((results) => {
        const users = results
          .filter((result) => result.status === "fulfilled")
          .map(
            (result) => (result as PromiseFulfilledResult<RealUserTable>).value
          )
          .filter((user) => user != null);
        const user = results.length > 0 ? users[0] || null : null;
        return user == null ? null : fromUserToUserAdapter(user);
      });
    },
    async getUserByAccount({
      providerAccountId,
      provider,
    }): Promise<AdapterUser | null> {
      return Promise.allSettled([
        client
          .select()
          .from<UserAttributes>("students")
          .where("email", providerAccountId)
          .first(),
        client
          .select()
          .from<UserAttributes>("coordinators")
          .where("email", providerAccountId)
          .first(),
      ]).then<AdapterUser | null>((results) => {
        const users = results
          .filter((result) => result.status === "fulfilled")
          .map(
            (result) => (result as PromiseFulfilledResult<RealUserTable>).value
          )
          .filter((user) => user != null);
        const user = results == null ? null : users[0] || null;
        return user == null ? null : fromUserToUserAdapter(user);
      });
    },
    async deleteUser(userId) {
      return;
    },
    async linkAccount(account) {
      DBclient("accounts").insert(account);
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return;
    },
    async getSessionAndUser(
      sessionToken
    ): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
      return Promise.resolve(
        DBclient.select().from("sessions").where("sessionToken", sessionToken)
      ).then<{ session: AdapterSession; user: AdapterUser } | null>(
        async (results) => {
          const session = results.length > 0 ? results[0] || null : null;
          if (session == null) return null;
          const user = await DBclient.from<RealUserTable>("users")
            .select()
            .where("id", session.userId);
          return {
            session: sessionToAdapterSession(session),
            user: fromUserToUserAdapter(user[0]),
          };
        }
      );
    },
    async deleteSession(sessionToken) {
      return Promise.resolve(
        DBclient("sessions")
          .where("sessionToken", sessionToken)
          .del()
          .returning("*")
      ).then<AdapterSession | null>((results) => {
        if (results.length == 0) return null;
        return sessionToAdapterSession(results[0]);
      });
    },
  };
}

export function fromUserToUserAdapter(user: RealUserTable): AdapterUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role as Role,
    image: null,
    emailVerified: null,
  };
}

export function sessionToAdapterSession(results): AdapterSession {
  return {
    userId: results.userId.toString(),
    expires: results.expires,
    sessionToken: results.sessionToken,
  };
}

export interface RealUserTable extends UserAttributes {
  role: Role;
}

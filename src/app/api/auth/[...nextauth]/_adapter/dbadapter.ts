import DBclient from "@/knex/config/DBClient";
import { Knex } from "knex";
import type { Session, User } from "knex/types/tables.js";
import {
  Adapter,
  AdapterUser,
  AdapterAccount,
  AdapterSession,
} from "next-auth/adapters";
export default function KnexAdapter(client: Knex): Adapter {
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
        return user == null ? null : fromUserToUserAdapter(user);
      });
    },
    async getUserByEmail(email): Promise<AdapterUser | null> {
      return Promise.resolve(
        client.select().from("users").where("email", email)
      ).then<AdapterUser | null>((results) => {
        const user = results.length > 0 ? results[0] || null : null;
        return user == null ? null : fromUserToUserAdapter(user);
      });
    },
    async getUserByAccount({
      providerAccountId,
      provider,
    }): Promise<AdapterUser | null> {
      return Promise.resolve(
        client
          .select("id")
          .from("users")
          .where("email", providerAccountId).first())
        .then<AdapterUser | null>((results) => {
          const user = results == null ? null : results[0] || null;
          return user == null ? null : fromUserToUserAdapter(user);
        });
    },
    async updateUser(user) {
      return;
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
    async createSession({
      sessionToken,
      userId,
      expires,
    }): Promise<AdapterSession> {
      return Promise.resolve(
        DBclient.from("sessions")
          .insert({
            userId: Number.parseInt(userId),
            sessionToken: sessionToken,
            expires: expires,
          })
          .returning<Session>("*")
      ).then<AdapterSession>((results) => {
        return sessionToAdapterSession(results);
      });
    },
    async getSessionAndUser(sessionToken) : Promise<{ session: AdapterSession; user: AdapterUser } | null>  {
      return Promise.resolve(
        DBclient.select().from("sessions").where("sessionToken", sessionToken)
      ).then<{ session: AdapterSession; user: AdapterUser } | null>(
        async (results) => {
          const session = results.length > 0 ? results[0] || null : null;
          if (session == null) return null;
          const user = await DBclient.select().from("users").where("id", session.userId);
          return { session: sessionToAdapterSession(session), user: fromUserToUserAdapter(user[0]) };
        }
      )
    },
    async updateSession({ sessionToken }) {
      return;
    },
    async deleteSession(sessionToken) {
      return Promise.resolve(DBclient("sessions").where("sessionToken", sessionToken).del().returning("*")).then<AdapterSession | null>((results) => {
        if (results.length == 0) return null;
        return sessionToAdapterSession(results[0]);
      });
    }
  };
}

export function fromUserToUserAdapter(user: User): AdapterUser {
  return {
    id: user.id.toString(),
    name: user.name,
    email: user.email,
    image: null,
    emailVerified: null,
  };
}
export function sessionToAdapterSession(results: Session): AdapterSession {
  return {
    userId: results.userId.toString(),
    expires: results.expires,
    sessionToken: results.sessionToken,
  };
}

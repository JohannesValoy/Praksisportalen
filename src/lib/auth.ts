import DBclient from "@/knex/config/DBClient";
import { getSession } from "next-auth/react";

export enum Role {
  STUDENT = "student",
  COORDINATOR = "coordinator",
  EMPLOYEE = "employee",
  ADMIN = "admin",
  NONE = "none",
}
export async function checkUserRole(): Promise<Role> {
  await getSession().then((session) => {
    console.log(session);
    if (session) {
      return DBclient.from("users")
        .select("role")
        .where("email", session.user.email)
        .first()
        .then((user) => {
          console.log(user);
          return Role[user.role] || Role.NONE;
        });
    }
  });
  return Role.NONE; // Add this line to return a default value
}

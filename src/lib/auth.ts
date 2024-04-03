import DBclient from "@/knex/config/DBClient";
import { getToken } from "next-auth/jwt";

export enum Role {
  STUDENT = "student",
  COORDINATOR = "coordinator",
  EMPLOYEE = "employee",
  ADMIN = "admin",
  NONE = "none",
}
export async function checkUserRole(req): Promise<Role> {
  await getToken(req).then((jwt) => {
    if (jwt) {
      return DBclient.from("users")
        .select("role")
        .where("email", jwt.email)
        .first()
        .then((user) => {
          return Role[user.role] || Role.NONE;
        });
    }
  });
  return Role.NONE; // Add this line to return a default value
}

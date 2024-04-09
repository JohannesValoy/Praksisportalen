//Credit to https://reacthustle.com/blog/nextjs-setup-role-based-authentication

import { DefaultSession, DefaultUser } from "next-auth";
// Define a role enum
export enum Role {
  student = "student",
  coordinator = "coordinator",
  employee = "employee",
  admin = "admin",
  none = "none",
}
// common interface for JWT and Session
interface IUser extends DefaultUser {
  role?: Role;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}

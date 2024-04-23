import { Role } from "@/app/api/auth/[...nextauth]/nextauth";
import { authoptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { User, getServerSession } from "next-auth";
import bcrypt from "bcrypt";

export async function checkUserRole(): Promise<Role> {
  return (await getUser())?.role; // Add this line to return a default value
}

export async function getUser(): Promise<User | null> {
  return (await getServerSession(authoptions))?.user;
}

export async function encryptPassword(password: string): Promise<string> {
  if (globalThis.Bun === undefined) {
    return await bcrypt.hash(password, 11);
  }
  return await Bun.password.hash(password, { algorithm: "bcrypt", cost: 11 });
}

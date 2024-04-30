import { Role } from "@/app/api/auth/[...nextauth]/nextauth";
import { authoptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { User, getServerSession } from "next-auth";
import bcrypt from "bcrypt";
/**
 * Returns the role of the current user.
 * @returns The role of the current user.
 */
export async function checkUserRole(): Promise<Role> {
  return (await getUser())?.role; // Add this line to return a default value
}
/**
 * Return the current user.
 * @returns The current user.
 */
export async function getUser(): Promise<User | null> {
  return (await getServerSession(authoptions))?.user;
}
/**
 * Encrypts the password into a hash with the bcrypt standard.
 * @param password The password to encrypt
 * @returns The encrypted password
 */
export async function encryptPassword(password: string): Promise<string> {
  if (globalThis.Bun === undefined) {
    return await bcrypt.hash(password, 11);
  }
  return await Bun.password.hash(password, { algorithm: "bcrypt", cost: 11 });
}

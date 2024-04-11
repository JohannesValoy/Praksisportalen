import { Role } from "@/app/api/auth/[...nextauth]/nextauth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import { User, getServerSession } from "next-auth";
import bcrypt from "bcrypt";

export async function checkUserRole(): Promise<Role> {
  return (await getUser())?.role; // Add this line to return a default value
}

export async function getUser(): Promise<User | null> {
  return (await getServerSession(authoptions))?.user;
}

export async function encryptPassword(password: string): Promise<string> {
  if (Bun === undefined) {
    return await bcrypt.hash(password, 11);
  }
  return await Bun.password.hash(password, { algorithm: "bcrypt", cost: 11 });
}

export async function encodeID(email: string, name: string) {
  return await getSHA256Hash(email + name);
}

//Credit https://stackoverflow.com/questions/59777670/how-can-i-hash-a-string-with-sha256
const getSHA256Hash = async (input) => {
  const textAsBuffer = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", textAsBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray
    .map((item) => item.toString(16).padStart(2, "0"))
    .join("");
  return hash;
};

import { Role } from "@/app/api/auth/[...nextauth]/nextauth";
import { authoptions} from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function checkUserRole(): Promise<Role> {
  return (await getServerSession(authoptions)).user.role || Role.none; // Add this line to return a default value
}

import NextAuth from "next-auth";
import authoptions from "./authOptions";
const handler = NextAuth(authoptions);

export { handler as GET, handler as POST };

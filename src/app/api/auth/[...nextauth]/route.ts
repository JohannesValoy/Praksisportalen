import NextAuth from "next-auth"

const handler = NextAuth({
    providers: [],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',    
        },
    }
)
export { handler as GET, handler as POST }
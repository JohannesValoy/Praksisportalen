
import { Adapter, AdapterUser, AdapterAccount, AdapterSession } from "next-auth/adapters";
export default function MyAdapter(client: ): Adapter {
    return {
        async createUser(user) {
            return;
        },
        async getUser(id) : Promise<AdapterUser | null> {
            return Promise.allSettled([
                client.candidate.findUnique({ where: { id: id } }),
                client.leader.findUnique({ where: { id: id } }),
                client.leader.findUnique({ where: { id: id } }),

            ]).then<AdapterUser | null>((results) => {
                const user = results[0] || results[1] || results[2] || null;
                return user == null ? null : fromUsertoUserAdapter(user)
            })
        },
        async getUserByEmail(email) : Promise<AdapterUser | null> {
            return Promise.allSettled([
                client.candidate.findUnique({ where: { email: email } }),
                client.leader.findUnique({ where: { email: email } }),
                client.leader.findUnique({ where: { email: email } }),
            ]).then<AdapterUser | null>((results) => {
                const user = results[0] || results[1] || results[2] || null;
                return user == null ? null : fromUsertoUserAdapter(user)
            });
        },
        async getUserByAccount({ providerAccountId, provider }) : Promise<AdapterUser | null> {
            return Promise.allSettled([
                client.candidate.findUnique({ where: { email: providerAccountId } }),
                client.leader.findUnique({ where: { email: providerAccountId} }),
                client.leader.findUnique({ where: { email: providerAccountId } }),
            ]).then<AdapterUser | null>((results) => {
                const user = results[0] || results[1] || results[2] || null;
                return user == null ? null : fromUsertoUserAdapter(user)
            });
        },
        async updateUser(user) {
            return;
        },
        async deleteUser(userId) {
            return;
        },
        async linkAccount(account) {
            return;
        },
        async unlinkAccount({ providerAccountId, provider }) {
            return;
        },
        async createSession({ sessionToken, userId, expires }) {
            return;
        },
        async getSessionAndUser(sessionToken) {
            return;
        },
        async updateSession({ sessionToken }) {
            return;
        },
        async deleteSession(sessionToken) {
            return;
        },
        async createVerificationToken({ identifier, expires, token }) {
            return;
        },
        async useVerificationToken({ identifier, token }) {
            return;
        },
    };
}
function fromUsertoUserAdapter(user : any) : AdapterUser {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        emailVerified: null,
    }
}
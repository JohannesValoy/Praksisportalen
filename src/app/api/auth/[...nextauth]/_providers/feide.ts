import DBclient from "@/knex/config/DBClient";
import { AuthOptions, Profile } from "next-auth";
import { OAuthConfig } from "next-auth/providers/oauth";

interface FeideUser  {
    sub : string;
    email: string;
    openid: string;
    name: string;
    picture: string;
}

const feideProvider : OAuthConfig<FeideUser> = {
    id: 'feide',
    name: 'Feide',
    type: 'oauth',
    wellKnown: "https://auth.dataporten.no/.well-known/openid-configuration",
    userinfo: 'https://auth.dataporten.no/openid/userinfo',
    authorization: "https://auth.dataporten.no/oauth/authorization",
    token: {
        url: "https://auth.dataporten.no/oauth/token",

    },
    profile: async (profile : FeideUser) => {
        return ({
            id: profile.email,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
        })
    },
    allowDangerousEmailAccountLinking: true, 
    clientId: process.env.FEIDE_CLIENT_ID,
    clientSecret: process.env.FEIDE_CLIENT_SECRET,
};

export default feideProvider;
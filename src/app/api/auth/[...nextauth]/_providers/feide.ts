import { AuthOptions } from "next-auth";
import { OAuthConfig } from "next-auth/providers/oauth";

interface FeideUser  {
    userid: string;
    email: string;
    profile : any;
    openid: string;
}

const feideProvider : OAuthConfig<FeideUser> = {
    id: 'feide',
    name: 'Feide',
    type: 'oauth',
    userinfo: 'https://auth.dataporten.no/openid/userinfo',
    issuer: "https://my.oidc-provider.com",
    profile: (profile : FeideUser) => {
        return {
        id: profile.userid,
        name: profile.profile.name,
        email: profile.email,
        image: profile.profile.picture,
        };
    },
    clientId: process.env.FEIDE_CLIENT_ID,
    clientSecret: process.env.FEIDE_CLIENT_SECRET,
};

export default feideProvider;
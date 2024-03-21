
interface FeideUser  {
    userid: string;
    email: string;
    profile : Dict<string>;
    openid: string;
}

const feideProvider = {
    id: 'feide',
    name: 'Feide',
    type: 'oauth',
    version: '2.0',
    scope: 'openid, profile, email, userid, groups-edu',
    params: { grant_type: 'authorization_code' },
    accessTokenUrl: 'https://auth.dataporten.no/oauth/token',
    requestTokenUrl: 'https://auth.dataporten.no/oauth/token',
    authorizationUrl: 'https://auth.dataporten.no/oauth/authorization',
    userinfo: 'https://auth.dataporten.no/openid/userinfo',
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
    idToken: true,
};

export default feideProvider;
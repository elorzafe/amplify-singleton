import { Observable } from "zen-observable-ts";

export type ICredentials = {
    accessKeyId: string;
    sessionToken: string;
    secretAccessKey: string;
    identityId: string;
    authenticated: boolean;
    expiration?: Date;
}

export type ResourceConfig = {
    Auth: {
        userPoolId?: string,
        identityPoolId?: string,
        userPoolWebClientId?: string,
    }
};
export type FrontendConfig = {
    sessionHandler?: SessionHandler
};

export type AmplifyUserSession = {
    isLoggedIn: boolean,
    username?: string,
    credentials?: ICredentials
};

export type SessionHandler = {
    getUserSession: () => Promise<AmplifyUserSession>,
    observeSession?: Observable<AmplifyUserSession>
}
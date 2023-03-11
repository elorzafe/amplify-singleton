import { Observable } from "zen-observable-ts";

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
    username?: string
};

export type SessionHandler = {
    getUserSession: () => Promise<AmplifyUserSession>,
    observeSession?: Observable<AmplifyUserSession>
}
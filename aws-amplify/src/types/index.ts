import type { Observable } from 'rxjs';
export type ICredentials = {
    accessKeyId: string;
    sessionToken: string;
    secretAccessKey: string;
    identityId: string;
    authenticated: boolean;
    expiration?: Date;
}

export interface JWT {
    payload: JSON,
    header: JSON,
    signature: string,
    toString: () => string,
    isValid: () => boolean
}

export type JWTS = {
    accessToken?: JWT,
    idToken?: JWT
}

export type ResourceConfig = {
    Auth?: {
        userPoolId?: string,
        identityPoolId?: string,
        userPoolWebClientId?: string,
    },
    API?: {},
    Analytics?: {},
    Storage?: {},
    DataStore?: {},
    Predictions?: {},
    Interactions?: {},
    Notifications?: {}
};

type AuthConfig = ResourceConfig["Auth"];

export type FrontendConfig = {
    userSessionProvider?: UserSessionProvider
};

export type AmplifyUserSession = {
    isLoggedIn: boolean,
    username?: string,
    credentials?: ICredentials,
    jwts?: JWTS
};

export type GetUserSessionOptions = {
    refresh?: boolean
}

export interface UserSessionProvider {
    getUserSession: (options?: GetUserSessionOptions) => Promise<AmplifyUserSession | undefined>,
    listenUserSession(): Observable<AmplifyUserSession>
}

export type UserSessionCallback = (user: AmplifyUserSession) => void;

export type ResourceConfigCallback = (config: Object | undefined) => void;

export type Categories = "Auth" | "API" | "Storage" | "Analytics" | "DataStore" | "Predictions" | "Interactions" | "Notifications";
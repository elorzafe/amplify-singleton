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
    sessionProvider?: AmplifyUserSessionProvider,
    analyticsProvider?: AnalyticsProvider,
    loggerProvider?: LoggerProvider
};

type LoggerProvider = {
    debug: (message: string) => void,
    info: (message: string) => void,
    warn: (message: string) => void,
    error: (message: string) => void
}

type AnalyticsProvider = {
    recordEvent: (event: string) => void // TODO: update to the correct type
}

export type AmplifyUserSession = {
    isLoggedIn: boolean,
    username?: string,
    credentials?: ICredentials,
    jwts?: JWTS
};

export type GetUserSessionOptions = {
    refresh?: boolean
}

export interface AmplifyUserSessionProvider {
    getUserSession: (options?: GetUserSessionOptions) => Promise<AmplifyUserSession>,
    listenUserSession(): Observable<AmplifyUserSession>
}

export type UserSessionCallback = (user: AmplifyUserSession) => void;

export type ResourceConfigCallback = (config: Object | undefined) => void;

export type Categories = "Auth" | "API" | "Storage" | "Analytics" | "DataStore" | "Predictions" | "Interactions" | "Notifications";
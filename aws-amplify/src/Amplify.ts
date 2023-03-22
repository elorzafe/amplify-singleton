import { AmplifyUserSession, Categories, FrontendConfig, GetUserSessionOptions, ResourceConfig, ResourceConfigCallback, UserSessionCallback } from "./types";

let userSessionListeners: UserSessionCallback[] = [];
let resourceConfigListeners: ResourceConfigCallback[] = [];
let resourcesConfig: ResourceConfig | undefined;
let frontendConfig: FrontendConfig | undefined;

const Amplify = {
    configure(resources: ResourceConfig, frontend: FrontendConfig): void {
        resourcesConfig = resources;
        frontendConfig = frontend;
    
        for (const listener of resourceConfigListeners) {
            listener(resourcesConfig);
        }
    
        if (typeof frontendConfig?.userSessionProvider?.listenUserSession === "function") {
            frontendConfig.userSessionProvider.listenUserSession((user: AmplifyUserSession) => {
                for (const userSessionListener of userSessionListeners) {
                    userSessionListener(user);
                }
            })
        }
    },
    async getUserSession(options?: GetUserSessionOptions): Promise<AmplifyUserSession | undefined> {
        return await frontendConfig?.userSessionProvider?.getUserSession({ refresh: options?.refresh });
    },
    listenUserSession(callback: UserSessionCallback): () => void {
        const getUserSessionPromise = Amplify.getUserSession();
        const localUserSessionListeners = userSessionListeners;
        localUserSessionListeners.push(callback);
        (async function () {
            const userSession = await getUserSessionPromise;
            if (userSession) { callback(userSession) };
        })();
        return () => {
            userSessionListeners = userSessionListeners.filter(listener => listener !== callback);
        }
    },
    getConfig(): ResourceConfig {
        return {...resourcesConfig};
    }
}

type ResourceConfigCategories = ResourceConfig["Auth"] | ResourceConfig["API"] | ResourceConfig["Analytics"] | undefined; 

Object.freeze(Amplify);

export { Amplify };
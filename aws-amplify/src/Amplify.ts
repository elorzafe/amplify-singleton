import { AmplifyUserSession, FrontendConfig, ResourceConfig, UserSessionCallback } from "./types";

class AmplifySingleton {
    userSessionListeners: UserSessionCallback[] = [];
    resourceConfigListeners: ResourceConfigCallback[] = [];
    resourcesConfig: ResourceConfig | undefined;
    frontendConfig: FrontendConfig | undefined;

    configure(resources: ResourceConfig, frontend: FrontendConfig): void {
        this.resourcesConfig = resources;
        this.frontendConfig = frontend;

        for (const listener of this.resourceConfigListeners) {
            listener(this.resourcesConfig);
        }

        if (typeof this.frontendConfig?.sessionHandler?.listenUserSession === "function") {
            this.frontendConfig.sessionHandler.listenUserSession((user: AmplifyUserSession) => {
                for (const userSessionListener of this.userSessionListeners) {
                    userSessionListener(user);                    
                }
            })
        }
    }

    async getUserSession(): Promise<AmplifyUserSession | undefined> {
        return await this.frontendConfig?.sessionHandler?.getUserSession();
    }

    listenUserSession(callback: UserSessionCallback): () => void {
        const getUserSessionPromise = this.getUserSession();
        const localUserSessionListeners = this.userSessionListeners;
        localUserSessionListeners.push(callback);
        (async function(){ 
            const userSession = await getUserSessionPromise;
            if (userSession) { callback(userSession) };
        })();
        return () => {
            this.userSessionListeners = this.userSessionListeners.filter(listener => listener !== callback);
        }
    }

    // Note: I think this could be narrowed down per category instead of getting the whole thing
    getResourceConfig(): ResourceConfig {
        return this.resourcesConfig ? JSON.parse(JSON.stringify(this.resourcesConfig)) : {};
    }

    listenResourceConfig(callback: ResourceConfigCallback){    
        this.resourceConfigListeners.push(callback);
        callback(this.getResourceConfig());
        return () => {
            this.resourceConfigListeners = this.resourceConfigListeners.filter(listener => listener !== callback);
        }
    }
}
type ResourceConfigCallback = (config: ResourceConfig) => void;

export const Amplify = new AmplifySingleton();
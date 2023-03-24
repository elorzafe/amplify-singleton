import { AmplifyUserSession, Categories, FrontendConfig, GetUserSessionOptions, ResourceConfig, ResourceConfigCallback, UserSessionCallback } from "./types";
import { Hub } from './Hub';
import { Observable } from "rxjs";

let resourceConfigListeners: ResourceConfigCallback[] = [];
let resourcesConfig: ResourceConfig | undefined;
let frontendConfig: FrontendConfig | undefined;

const Amplify = {
    configure(resources: ResourceConfig, frontend: FrontendConfig): void {
        // TODO: Make this incremental
        resourcesConfig = resources;
        frontendConfig = frontend; 
    
        for (const listener of resourceConfigListeners) {
            listener(resourcesConfig);
        }
    
        Hub.dispatch('core', {
            event:'configure',
            data: resourcesConfig,
        }, 'Configure');

    },
    async getUserSession(options?: GetUserSessionOptions): Promise<AmplifyUserSession | undefined> {
        if (! frontendConfig?.userSessionProvider) {
            throw new Error('userSessionProvider not added during Amplify.configure');
        }
        return await frontendConfig?.userSessionProvider?.getUserSession({ refresh: options?.refresh });
    },
    listenUserSession(): Observable<AmplifyUserSession> {
        if (frontendConfig?.userSessionProvider?.listenUserSession) {
            return frontendConfig.userSessionProvider.listenUserSession();
        } else {
            throw new Error('No user session provider configured');
        }
    },
    getConfig(): ResourceConfig {
        return {...resourcesConfig};
    }
}

type ResourceConfigCategories = ResourceConfig["Auth"] | ResourceConfig["API"] | ResourceConfig["Analytics"] | undefined; 

Object.freeze(Amplify);

export { Amplify };
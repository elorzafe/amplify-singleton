import { AmplifyUserSession, FrontendConfig, GetUserSessionOptions, ResourceConfig, ResourceConfigCallback, UserSessionCallback } from "./types";
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
    getConfig(): ResourceConfig {
        return {...resourcesConfig};
    },
    Auth: {
        async getUserSession(options?: GetUserSessionOptions): Promise<AmplifyUserSession | undefined> {
            if (! frontendConfig?.sessionProvider) {
                throw new Error('userSessionProvider not added during Amplify.configure');
            }
            return await frontendConfig?.sessionProvider?.getUserSession({ refresh: options?.refresh });
        },
        listenUserSession(): Observable<AmplifyUserSession> {
            if (frontendConfig?.sessionProvider?.listenUserSession) {
                return frontendConfig.sessionProvider.listenUserSession();
            } else {
                throw new Error('No user session provider configured');
            }
        },
    },
    Analytics: {
        recordEvent: (event: string) => {
            if (frontendConfig?.analyticsProvider?.recordEvent) {
                return frontendConfig.analyticsProvider.recordEvent(event);
            } else {
                throw new Error('No analytics provider configured')
            }
        }
    },
    Logger: {
        info:(message: string) => {
            if (frontendConfig?.loggerProvider?.info) {
                return frontendConfig.loggerProvider.info(message);
            } else {
                throw new Error('No loger provider configured')
            }
        },
        warn:(message: string) => {
            if (frontendConfig?.loggerProvider?.warn) {
                return frontendConfig.loggerProvider.warn(message);
            } else {
                throw new Error('No loger provider configured')
            }
            
        },
        debug:(message: string) => {
            if (frontendConfig?.loggerProvider?.debug) {
                return frontendConfig.loggerProvider.debug(message);
            } else {
                throw new Error('No loger provider configured')
            }
            
        },
        error:(message: string) => {
            if (frontendConfig?.loggerProvider?.error) {
                return frontendConfig.loggerProvider.error(message);
            } else {
                throw new Error('No loger provider configured')
            }

        },

    }
}

type ResourceConfigCategories = ResourceConfig["Auth"] | ResourceConfig["API"] | ResourceConfig["Analytics"] | undefined; 

Object.freeze(Amplify);

export { Amplify };
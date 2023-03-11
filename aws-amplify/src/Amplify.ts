import { Observable } from "zen-observable-ts";
import { AmplifyUserSession, FrontendConfig, ResourceConfig } from "./types";

class AmplifySingleton {
    resourcesConfig: ResourceConfig | undefined;
    frontendConfig: FrontendConfig | undefined;
    notifyConfig: ((resources: ResourceConfig) => void) | undefined;

    configure(resources: ResourceConfig, frontend: FrontendConfig): void {
        this.resourcesConfig = resources;
        this.frontendConfig = frontend;

        if (this.notifyConfig) {
            this.notifyConfig(this.resourcesConfig);
        }
    }

    async getUserSession(): Promise<AmplifyUserSession | undefined> {
        return await this.frontendConfig?.sessionHandler?.getUserSession();
    }
    
    observeUserSession(): Observable<AmplifyUserSession> {
        if (!this.frontendConfig ||
            !this.frontendConfig.sessionHandler ||
            !this.frontendConfig.sessionHandler.observeSession) {
            throw new Error('No observe on sessionHandler');
        }

        return this.frontendConfig.sessionHandler.observeSession;

    }
    
    // Note: I think this could be narrowed down per category instead of getting the whole thing
    getResourceConfig(): ResourceConfig {
        return JSON.parse(JSON.stringify(this.resourcesConfig));
    }
    
    observeConfig(): Observable<ResourceConfig> {
        return new Observable(observer => {
            this.notifyConfig = (resourcesConfig: ResourceConfig) => {
                observer.next(resourcesConfig);
            }
        });
    }
}

export const Amplify = new AmplifySingleton();
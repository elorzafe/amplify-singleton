import { Observable } from "zen-observable-ts";
import { AmplifyUserSession, FrontendConfig, ResourceConfig } from "./types";

class AmplifySingleton {
    resourcesConfig: ResourceConfig | undefined;
    frontendConfig: FrontendConfig | undefined;
    configure(resources: ResourceConfig, frontend: FrontendConfig): void {
        this.resourcesConfig = resources;
        this.frontendConfig = frontend;
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
    
    getResourceConfig(): ResourceConfig {
        return JSON.parse(JSON.stringify(this.resourcesConfig));
    }
    
    observeConfig(): Observable<ResourceConfig> {
        throw new Error('Not implemented');
    }
}

export const Amplify = new AmplifySingleton();
import { Observable, Observer } from "rxjs";

export type HubCapsule = {
    channel: string;
    payload: HubPayload;
    source: string;
    patternInfo?: string[];
};

export type HubPayload = {
    event: string;
    data?: any;
    message?: string;
};

class HubClass {
    observerMap: Record<string, Observer<HubCapsule>[]>;

    constructor() {
        this.observerMap = {};
    }

    observe(channel: string): Observable<HubCapsule> {
        return new Observable(observer => {
            if (!this.observerMap[channel]) {
                this.observerMap[channel] = []
            }

            this.observerMap[channel].push(observer);

            return () => {
                this.observerMap[channel] = this.observerMap[channel].filter(currentObserver => currentObserver != observer);
            }
        });
    }

    dispatch(channel: string,
        payload: HubPayload,
        source: string = ''): void {
        if (this.observerMap[channel]) {
            const observers = this.observerMap[channel];
            for (const observer of observers) {
                observer.next({
                    channel,
                    payload,
                    source,
                });
            }
        }
    }
}

export const Hub = new HubClass();
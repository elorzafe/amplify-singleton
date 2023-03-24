import { Observable, Observer } from "rxjs";
import { AmplifyUserSession, UserSessionProvider, UserSessionCallback } from "../types";

export let userSessionNotifier = (user: AmplifyUserSession) => {
    for (const observer of observers) {
        observer.next(user);
    }
};

const activeSession: AmplifyUserSession = {
    isLoggedIn: false
}

let observers: Observer<AmplifyUserSession>[] = [];

export const userSessionProvider: UserSessionProvider = {
    getUserSession: async () => {
        // check if session is valid, otherwise refresh
        // if first time called get session from persisted state
        return activeSession;
    },
    listenUserSession(): Observable<AmplifyUserSession> {
        return new Observable(observer => {
            observer.next(activeSession);
            observers.push(observer);
            return () => {
                observer.complete();
                observers = observers.filter(curr => curr != observer);
            }
        })
    }
}


import { Observable } from "zen-observable-ts";
import { AmplifyUserSession, SessionHandler } from "../types";

export let sessionNotifier: (user: AmplifyUserSession) => void;

const activeSession: AmplifyUserSession = {
    isLoggedIn: false
}

export const sessionHandler: SessionHandler = {
    getUserSession: async () => {
        // check if session is valid, otherwise refresh
        // if first time called get session from persisted state
        return activeSession;
    },
    observeSession: new Observable(observer => {
        observer.next(activeSession);
        sessionNotifier = (userSession) => {
            activeSession.isLoggedIn = userSession.isLoggedIn;
            activeSession.username = userSession.username;

            observer.next(activeSession)
        }
    })
}
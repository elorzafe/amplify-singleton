import { AmplifyUserSession, SessionHandler, UserSessionCallback } from "../types";

export let sessionNotifier = (user: AmplifyUserSession) => {
    for (const listener of listeners) {
        listener(user);
    }
};

const activeSession: AmplifyUserSession = {
    isLoggedIn: false
}

let listeners: UserSessionCallback[] = [];

export const sessionHandler: SessionHandler = {
    getUserSession: async () => {
        // check if session is valid, otherwise refresh
        // if first time called get session from persisted state
        return activeSession;
    },
    listenUserSession: (callback: UserSessionCallback) => {
        callback(activeSession);
        listeners.push(callback);
        return () => {
            listeners = listeners.filter(listener => listener !== callback);
        }  
    }
}
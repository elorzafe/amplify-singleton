import { AmplifyUserSession, UserSessionProvider, UserSessionCallback } from "../types";

export let userSessionNotifier = (user: AmplifyUserSession) => {
    for (const listener of listeners) {
        listener(user);
    }
};

const activeSession: AmplifyUserSession = {
    isLoggedIn: false
}

let listeners: UserSessionCallback[] = [];

export const userSessionProvider: UserSessionProvider = {
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
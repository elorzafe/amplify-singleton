import { Amplify } from "..";
import type * as AuthNProvider from "../types/AuthNProvider";
import { userSessionNotifier } from "./userSessionProvider";

export const signIn: AuthNProvider.SignIn = async ({ username, password }: { username: string, password: string }) => {
    const config = Amplify.getConfig();
    if (!config?.Auth?.userPoolId) {
        throw new Error('No user pool configured');
    }

    if (userSessionNotifier && typeof userSessionNotifier === 'function') {
        userSessionNotifier({
            isLoggedIn: true,
            username
        });
    }
    return;
}

export const signOut: AuthNProvider.SignOut = async () => {
    if (userSessionNotifier && typeof userSessionNotifier === 'function') {
        userSessionNotifier({
            isLoggedIn: false,
            username: undefined
        });
    }

    return;
}


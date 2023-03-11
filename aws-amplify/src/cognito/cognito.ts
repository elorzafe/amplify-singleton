import { Amplify } from "..";
import { sessionNotifier } from "./sessionHandler";

export async function signIn({ username, password }: { username: string, password: string }): Promise<boolean> {
    const config = Amplify.getResourceConfig();
    if (! (config.Auth.userPoolId)) {
        throw new Error('No user pool configured');
    }

    if (sessionNotifier && typeof sessionNotifier === 'function') {
        sessionNotifier({
            isLoggedIn: true,
            username
        });
    }
    return true;
}

export async function signOut() {
    if (sessionNotifier && typeof sessionNotifier === 'function') {
        sessionNotifier({
            isLoggedIn: false,
            username: undefined
        });
    }
}


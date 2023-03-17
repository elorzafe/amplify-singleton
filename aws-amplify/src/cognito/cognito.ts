import { Amplify } from "..";
import { userSessionNotifier } from "./userSessionProvider";

export async function signIn({ username, password }: { username: string, password: string }): Promise<boolean> {
    const config = Amplify.getResourceConfig();
    if (!config?.Auth?.userPoolId) {
        throw new Error('No user pool configured');
    }

    if (userSessionNotifier && typeof userSessionNotifier === 'function') {
        userSessionNotifier({
            isLoggedIn: true,
            username
        });
    }
    return true;
}

export async function signOut() {
    if (userSessionNotifier && typeof userSessionNotifier === 'function') {
        userSessionNotifier({
            isLoggedIn: false,
            username: undefined
        });
    }
}


import { Observable } from "rxjs";
import { AmplifyUserSession, AmplifyUserSessionProvider } from "../types";

export const credentialsProvider: (userSessionProvider: AmplifyUserSessionProvider) => AmplifyUserSessionProvider = (userSessionProvider: AmplifyUserSessionProvider) => {
    return {
        getUserSession: async () => {
            let user = await userSessionProvider.getUserSession();
            if (user) {
                user.credentials = {
                    accessKeyId: 'access',
                    secretAccessKey: 'secret',
                    identityId: 'identity',
                    sessionToken: 'session',
                    authenticated: user?.isLoggedIn ? true : false,
                }
            }
            return user;
        },
        listenUserSession(): Observable<AmplifyUserSession> {
            return new Observable(observer => {
                userSessionProvider.listenUserSession().subscribe({
                    next: user => {
                        user.credentials = {
                            accessKeyId: 'access',
                            secretAccessKey: 'secret',
                            identityId: 'identity',
                            sessionToken: 'session',
                            authenticated: user?.isLoggedIn ? true : false,

                        }
                        observer.next(user);
                    },
                    error: observer.error,
                    complete: observer.complete
                })
            })
        }
    }
}
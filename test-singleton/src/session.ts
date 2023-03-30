import { Amplify } from 'aws-amplify';
import type { AmplifyUserSession } from 'aws-amplify';
export async function UserInfoComponent() {
    const userInfoComponent = document.createElement('div');

    Amplify.Auth.listenUserSession().subscribe((userSession: AmplifyUserSession) => {
        console.log({userSession});
        userInfoComponent.innerHTML = `user: ${JSON.stringify(userSession, null, 2)}`
    });

    return userInfoComponent;
}
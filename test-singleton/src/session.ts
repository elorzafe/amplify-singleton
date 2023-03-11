import { Amplify } from 'aws-amplify';

export async function UserInfoComponent() {
    const userInfoComponent = document.createElement('div');

    Amplify.observeUserSession().subscribe({
        next: (userSession) => {
            userInfoComponent.innerHTML = `user: ${JSON.stringify(userSession, null, 2)}`
        }
    });

    return userInfoComponent;
}
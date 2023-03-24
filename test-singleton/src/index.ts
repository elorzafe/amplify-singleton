import { Amplify, userSessionProvider, Hub, credentialsProvider } from 'aws-amplify';
import { filter } from 'rxjs';
import { createSignIn, createSignOut } from './components';
import { UserInfoComponent } from './session';


Hub.observe('core').subscribe({ next: (capsule) => console.warn(capsule) });

Amplify.configure({
    Auth: {
        userPoolId: 'asasd',
        userPoolWebClientId: 'asdasd'
    }
}, {
    userSessionProvider: credentialsProvider(userSessionProvider)
});

// Auth guard, this could be a useEffect on react (a hook could be very easily implement with Amplify Singleton)
Amplify.listenUserSession().pipe(filter(user => !user.isLoggedIn)).subscribe((user) => {
    console.log(`logged out: ${user}`);
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = '';

    appContent.appendChild(createSignIn());
    
});
Amplify.listenUserSession().pipe(filter(user => user.isLoggedIn)).subscribe((user) => {
    console.log(`logged In: ${user}`);
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = '';

    const signOutButton = createSignOut();

    const content = document.createElement('p');
    content.innerHTML = `This is a secret content only visible for the current user: ${user.username}`;

    appContent.appendChild(content);
    appContent.appendChild(signOutButton);
});

const userInfo = document.getElementById('user-info');
UserInfoComponent().then(comp => userInfo.appendChild(comp));

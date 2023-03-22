import { Amplify, userSessionProvider } from 'aws-amplify';

import { createConfigButton, createSignIn, createSignOut } from './test';
import { UserInfoComponent } from './session';

Amplify.configure({
    Auth: {
        userPoolId: 'asasd',
        userPoolWebClientId: 'asdasd'
    }
}, {
    userSessionProvider
});

const signInButton = document.getElementById('signIn-button');
signInButton.appendChild(createSignIn());

const signOutButton = document.getElementById('signOut-button');
signOutButton.appendChild(createSignOut());

const userInfo = document.getElementById('user-info');
UserInfoComponent().then(comp => userInfo.appendChild(comp));

const updateConfig = document.getElementById('update-config');
updateConfig.appendChild(createConfigButton());
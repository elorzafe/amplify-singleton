import { Amplify } from 'aws-amplify';
import { createSignIn, createSignOut } from './test';
import { UserInfoComponent } from './session';

import { sessionHandler } from 'aws-amplify';

Amplify.configure({
    Auth: {
        userPoolId: 'asasd',
        userPoolWebClientId: 'asdasd'
    }
}, {
    sessionHandler
});

const signInButton = document.getElementById('signIn-button');
signInButton.appendChild(createSignIn());

const signOutButton = document.getElementById('signOut-button');
signOutButton.appendChild(createSignOut());

const userInfo = document.getElementById('user-info');
UserInfoComponent().then(comp => userInfo.appendChild(comp));
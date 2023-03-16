import { Amplify } from 'aws-amplify';
import { createConfigButton, createSignIn, createSignOut } from './test';
import { UserInfoComponent } from './session';

import { sessionHandler, ResourceConfig } from 'aws-amplify';

Amplify.listenResourceConfig((config: ResourceConfig) => {
    console.warn({config})
})

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

const updateConfig = document.getElementById('update-config');
updateConfig.appendChild(createConfigButton());
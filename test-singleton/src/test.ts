import { Amplify, signIn, signOut } from 'aws-amplify';

export function createSignIn() {
    const button = document.createElement('button');
    button.innerHTML = 'Sign In';
    button.addEventListener('click', async () => {
        await signIn({ username: prompt('username'), password: '' });
    })

    return button;
};

export function createSignOut() {
    const button = document.createElement('button');
    button.innerHTML = 'Sign Out';
    button.addEventListener('click', async () => {
        signOut();
    })

    return button;
};

export function createConfigButton() {
    const button = document.createElement('button');
    button.innerHTML = 'Config';
    button.addEventListener('click', async () => {
        Amplify.configure({
            Auth: {
                identityPoolId: 'asdasd'
            }
        }, {});
    })
    
    return button;

}
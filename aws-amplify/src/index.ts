export { Amplify } from './Amplify';

export { signIn, signOut } from './cognito/cognito';

export { userPoolSessionProvider } from './cognito/userSessionProvider';
export { credentialsProvider } from './cognito/credentialsProvider';

export type { AmplifyUserSessionProvider, AmplifyUserSession, ResourceConfig } from './types';

export { Hub } from './Hub';
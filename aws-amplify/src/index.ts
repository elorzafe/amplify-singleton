export { Amplify } from './Amplify';

export { signIn, signOut } from './cognito/cognito';

export { userSessionProvider } from './cognito/userSessionProvider';
export { credentialsProvider } from './cognito/credentialsProvider';

export type { UserSessionProvider, AmplifyUserSession, ResourceConfig } from './types';

export { Hub } from './Hub';
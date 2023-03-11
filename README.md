# Amplify Singleton

`aws-amplify` directory contains a draft of Amplify Singleton and a sample implementation of Cognito provider

`test-singleton` directory is a sample app that uses `webpack` and `tsc` to compile and generate a bundle that is used on a simple Web App. The sample App has two buttons, `Sign In` and `Sign Out` just to demonstrate how the library will notify when there is a user change. Also this is using `Amplify.getConfig()` to read the configuration, you can try removing `userPoolId` and see what happens.

Instructions to run
- On `aws-amplify` directory run `yarn && yarn unlink && yarn link && yarn build`
- On `test-singleton` directory run `yarn && yarn link aws-amplify && yarn start`

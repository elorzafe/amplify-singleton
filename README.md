# Amplify Singleton

`aws-amplify` directory contains a draft of Amplify Singleton and a sample implementation of Cognito provider

`test-singleton` directory is a sample app that uses `webpack` and `tsc` to compile and generate a bundle that is used on a simple Web App.

Instructions to run
- On `aws-amplify` directory run `yarn && yarn unlink && yarn link && yarn build`
- On `test-singleton` directory run `yarn && yarn link aws-amplify && yarn start`

import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from '../aws-exports';
import { Auth } from 'aws-amplify';

export const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY, // or type: awsconfig.aws_appsync_authenticationType,
    apiKey: awsconfig.aws_appsync_apiKey,
  },
  disableOffline: true
});

export const privateClient = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS, // or type: awsconfig.aws_appsync_authenticationType,
    // apiKey: awsconfig.aws_appsync_apiKey,
    jwtToken: () => Auth.currentSession().then((res) => res.getAccessToken().getJwtToken()), 
  },
  disableOffline: true
});

// export default client;
// export default privateClient;

// module.exports = {
//   client: client, 
//   privateclient: privateClient
// };

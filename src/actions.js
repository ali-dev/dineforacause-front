import Amplify, { API, graphqlOperation, Logger } from 'aws-amplify';
import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import {getCauseInfo} from './graphql/queries';

import { apiCall } from './api/api'
import {
  CHANGE_SEARCHFIELD,
  REQUEST_CAUSES_PENDING,
  REQUEST_CAUSES_SUCCESS,
  REQUEST_CAUSES_FAILED,
  REQUEST_CAUSE_PENDING,
  REQUEST_CAUSE_SUCCESS,
  REQUEST_CAUSE_FAILED,
  
 } from './constants'

import awsconfig from './aws-exports';
Amplify.configure(awsconfig);


const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY, // or type: awsconfig.aws_appsync_authenticationType,
    apiKey: awsconfig.aws_appsync_apiKey,
  }
});

export const setSearchField = (text) => ({ type: CHANGE_SEARCHFIELD, payload: text })

export const requestCauses = () => (dispatch) => {
  dispatch({ type: REQUEST_CAUSES_PENDING })
  // apiCall('https://jsonplaceholder.typicode.com/posts')
  apiCall('https://c0rhb23fte.execute-api.us-east-1.amazonaws.com/dev/cause')
    .then(data => dispatch({ type: REQUEST_CAUSES_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_CAUSES_FAILED, payload: error }))
}


export const requestCause = () => (dispatch) => {
  dispatch({ type: REQUEST_CAUSE_PENDING })
  client.query({
	  query: gql(getCauseInfo),
	  variables: {
        id: "b8586912-dc35-11e9-a981-95bdc25a2792",
        organizationId: "60790acc-8d7c-11e9-bc42-526af7764f64",
		    
	  }
	}).then(data => dispatch({ type: REQUEST_CAUSE_SUCCESS, payload: data }))
	  .catch(e => dispatch({ type: REQUEST_CAUSE_FAILED, payload: e }))
 
}


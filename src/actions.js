import gql from 'graphql-tag';
import {getCauseInfo, getCauses, addCharge} from './graphql/queries';
import client from './api/appSyncClient'
//import { apiCall } from './api/api'
import {
  CHANGE_SEARCHFIELD,
  REQUEST_CAUSES_PENDING,
  REQUEST_CAUSES_SUCCESS,
  REQUEST_CAUSES_FAILED,
  REQUEST_CAUSE_PENDING,
  REQUEST_CAUSE_SUCCESS,
  REQUEST_CAUSE_FAILED,
  
 } from './constants'


export const setSearchField = (text) => ({ type: CHANGE_SEARCHFIELD, payload: text })

export const requestCauses = () => (dispatch) => {
  dispatch({ type: REQUEST_CAUSES_PENDING })
  // apiCall('https://jsonplaceholder.typicode.com/posts')
  client.query({
	  query: gql(getCauses),
	  
	}).then(data => dispatch({ type: REQUEST_CAUSES_SUCCESS, payload: data.data.getAllCauses.causes }))
	  .catch(e => dispatch({ type: REQUEST_CAUSES_FAILED, payload: e }))
}




export const requestCause = (organizationId, id) => (dispatch) => {
  dispatch({ type: REQUEST_CAUSE_PENDING })
  client.query({
	  query: gql(getCauseInfo),
	  variables: {
        organizationId: organizationId,
		    id: id,
        
	  }
	}).then(data => dispatch({ type: REQUEST_CAUSE_SUCCESS, payload: data.data.getCauseInfo }))
	  .catch(e => dispatch({ type: REQUEST_CAUSE_FAILED, payload: e }))
}




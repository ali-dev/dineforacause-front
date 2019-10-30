import gql from 'graphql-tag';
import {getCauseInfo, getCauses, addCharge, addEvent, getEventByView} from './graphql/queries';
import client from './api/appSyncClient'
import {
  CHANGE_SEARCHFIELD,
  REQUEST_CAUSES_PENDING,
  REQUEST_CAUSES_SUCCESS,
  REQUEST_CAUSES_FAILED,
  REQUEST_CAUSE_PENDING,
  REQUEST_CAUSE_SUCCESS,
  REQUEST_CAUSE_FAILED,
  REQUEST_EVENT_PENDING,
  REQUEST_EVENT_SUCCESS,
  REQUEST_EVENT_FAILED
  
 } from './constants'


export const setSearchField = (text) => ({ type: CHANGE_SEARCHFIELD, payload: text })

export const requestCauses = () => (dispatch) => {
  dispatch({ type: REQUEST_CAUSES_PENDING })
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

export const requestEventForView = (viewId) => (dispatch) => {
  dispatch({ type: REQUEST_EVENT_PENDING })
  client.query({
    query: gql(getEventByView),
    variables: {
        viewId: viewId
    }
  }).then(data => dispatch({ type: REQUEST_EVENT_SUCCESS, payload: data.data.getEventByView }))
    .catch(e => dispatch({ type: REQUEST_EVENT_FAILED, payload: e }))
}




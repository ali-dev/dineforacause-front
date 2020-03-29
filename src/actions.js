import gql from 'graphql-tag';
import {getCauseInfo, getAllCauses, getEventForView, getEventForEdit} from './graphql/queries';//addCharge, 
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
  REQUEST_EVENT_FAILED,
  REQUEST_EVENT_FOR_EDIT_PENDING,
  REQUEST_EVENT_FOR_EDIT_SUCCESS,
  REQUEST_EVENT_FOR_EDIT_FAILED,
  REQUEST_DATA_FOR_RSVP_PENDING,
  REQUEST_DATA_FOR_RSVP_SUCCESS,
  REQUEST_DATA_FOR_RSVP_FAILED
  
  
 } from './constants'


export const setSearchField = (text) => ({ type: CHANGE_SEARCHFIELD, payload: text })

export const requestCauses = () => (dispatch) => {
  dispatch({ type: REQUEST_CAUSES_PENDING })
  client.query({
	  query: gql(getAllCauses),
	  
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
  dispatch({ type: REQUEST_EVENT_PENDING });
  client.query({
    query: gql(getEventForView),
    variables: {
        viewId: viewId
    }
  }).then(data => dispatch({ type: REQUEST_EVENT_SUCCESS, payload: data.data.getEventForView }))
    .catch(e => dispatch({ type: REQUEST_EVENT_FAILED, payload: e }))
}


export const requestDataForRSVP = (viewId, guestId) => (dispatch) => {
  dispatch({ type: REQUEST_DATA_FOR_RSVP_PENDING });
  client.query({
    query: gql(getEventForView),
    variables: {
        viewId: viewId
    }
  }).then(data  => { 
      const event = data.data.getEventForView;
      
      let result = {
        event: event,
        guestId: guestId,
        guest: null
      }
      
      if(event !== 'test') {
        console.log(event)
        const guests = JSON.parse(event.guests);
        if (guests[guestId]) {
          result.guest = guests[guestId]
        }
      }
      dispatch({ type: REQUEST_DATA_FOR_RSVP_SUCCESS, payload: result })

    })
    .catch(e => dispatch({ type: REQUEST_DATA_FOR_RSVP_FAILED, payload: e }))
}

export const getGuestFromEvent = (event, guestId) => (dispatch) => {
  alert(event.eventName);
  alert(guestId)
  // dispatch({ type: REQUEST_EVENT_PENDING });
  // client.query({
  //   query: gql(getEventForView),
  //   variables: {
  //       viewId: viewId
  //   }
  // }).then(data => dispatch({ type: REQUEST_EVENT_SUCCESS, payload: data.data.getEventForView }))
  //   .catch(e => dispatch({ type: REQUEST_EVENT_FAILED, payload: e }))
}

export const requestEventForEdit = (editId) => (dispatch) => {
  dispatch({ type: REQUEST_EVENT_FOR_EDIT_PENDING });
  client.query({
    query: gql(getEventForEdit),
    variables: {
      editId: editId
    }
  }).then(data => dispatch({ type: REQUEST_EVENT_FOR_EDIT_SUCCESS, payload: data.data.getEventForEdit }))
    .catch(e => dispatch({ type: REQUEST_EVENT_FOR_EDIT_FAILED, payload: e }))
}




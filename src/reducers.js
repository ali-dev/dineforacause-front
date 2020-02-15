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
 } from './constants';

const initialStateSearch = {
  searchField: ''
}

export const searchCauses = (state=initialStateSearch, action={}) => {
  switch (action.type) {
    case CHANGE_SEARCHFIELD:
      return Object.assign({}, state, {searchField: action.payload})
    default:
      return state
  }
}

const initialStateCauses = {
  causes: [],
  isPending: true
}

export const requestCauses = (state=initialStateCauses, action={}) => {
  switch (action.type) {
    case REQUEST_CAUSES_PENDING:
      return Object.assign({}, state, {isPending: true})
    case REQUEST_CAUSES_SUCCESS:
      return Object.assign({}, state, {causes: action.payload, isPending: false})
    case REQUEST_CAUSES_FAILED:
      return Object.assign({}, state, {error: action.payload})
    default:
      return state
  }
}


const initialStateCause = {
  cause: "test",
  isPending: true
}

export const requestCause = (state=initialStateCause, action={}) => {
  switch (action.type) {
    case REQUEST_CAUSE_PENDING:
      return Object.assign({}, state, {isPending: true})
    case REQUEST_CAUSE_SUCCESS:
      return Object.assign({}, state, {cause: action.payload, isPending: false})
    case REQUEST_CAUSE_FAILED:
      return Object.assign({}, state, {error: action.payload})
    default:
      return state
  }
}


const initialStateEventView = {
  event: "test",
  isPending: true
}
export const requestEventForView = (state=initialStateEventView, action={}) => {
  switch (action.type) {
    case REQUEST_EVENT_PENDING:
      return Object.assign({}, state, {isPending: true})
    case REQUEST_EVENT_SUCCESS:
      return Object.assign({}, state, {event: action.payload, isPending: false})
    case REQUEST_EVENT_FAILED:
      return Object.assign({}, state, {error: action.payload})
    default:
      return state  
  }
}

const initialStateEventEdit = {
  event: "test",
  isPending: true,
  causeDetails: {}
}
export const requestEventForEdit = (state=initialStateEventEdit, action={}) => {
  switch (action.type) {
    case REQUEST_EVENT_FOR_EDIT_PENDING:
      return Object.assign({}, state, {isPending: true})
    case REQUEST_EVENT_FOR_EDIT_SUCCESS:
      return Object.assign({}, state, {event: action.payload, isPending: false})
    case REQUEST_EVENT_FOR_EDIT_FAILED:
      return Object.assign({}, state, {error: action.payload})
    default:
      return state  
  }
}



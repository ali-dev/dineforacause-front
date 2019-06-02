import {
  CHANGE_SEARCHFIELD,
  REQUEST_CAUSES_PENDING,
  REQUEST_CAUSES_SUCCESS,
  REQUEST_CAUSES_FAILED
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

import { apiCall } from './api/api'
import {
  CHANGE_SEARCHFIELD,
  REQUEST_CAUSES_PENDING,
  REQUEST_CAUSES_SUCCESS,
  REQUEST_CAUSES_FAILED
 } from './constants'


export const setSearchField = (text) => ({ type: CHANGE_SEARCHFIELD, payload: text })

export const requestCauses = () => (dispatch) => {
  dispatch({ type: REQUEST_CAUSES_PENDING })
  apiCall('https://jsonplaceholder.typicode.com/posts')
    .then(data => dispatch({ type: REQUEST_CAUSES_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_CAUSES_FAILED, payload: error }))
}
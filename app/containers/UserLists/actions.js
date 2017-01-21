import { normalize } from 'normalizr'

import { getIsLoading } from './selectors'
import { userListsSchema } from '../../api/schemas'

// TODO: Consider one type 'USER_LISTS_FETCH' w/ success, loading, etc.
export const fetchUserLists = (userID) => (dispatch, getState, api) => {
  if (getIsLoading(getState())) {
    return Promise.resolve()
  }

  dispatch({
    type: 'USER_LISTS_REQUEST',
    userID,
  })

  return api.fetchUserLists(userID)
    .then(response => normalize(response, userListsSchema))
    .then(response => dispatch({
        type: 'USER_LISTS_RECEIVE',
        response,
    }))
    .catch((err) => {
      console.error(err)
      dispatch({
        type: 'USER_LISTS_FAILURE',
        errorMessage: err.message,
      })
    })
}

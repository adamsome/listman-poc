import { normalize } from 'normalizr'

import { getIsLoading } from './selectors'
import { userListsSchema } from '../../api/schemas'

const fetchUserLists2 = (userID, status, payload) => ({
  type: 'USER_LISTS_FETCH',
  userID,
  status,
  payload,
})

// TODO: Consider one type 'USER_LISTS_FETCH' w/ success, loading, etc.
export const fetchUserLists = (userID) => (dispatch, getState, api) => {
  if (getIsLoading(getState())) {
    return Promise.resolve()
  }

  dispatch(fetchUserLists2(userID))

  return api.fetchUserLists(userID)
    .then(response => {
      const userLists = normalize(response, userListsSchema)
      dispatch(fetchUserLists2(userID, 'success', userLists))
    })
    .catch((err) => {
      console.error(err)
      dispatch(fetchUserLists2(userID, 'error', err.message))
    })
}

import { browserHistory } from 'react-router';
import { normalize } from 'normalizr'

import { getIsLoading } from './selectors'
import { userListsSchema } from '../../api/schemas'

// TODO: Consider one type 'USER_LISTS_FETCH' w/ success, loading, etc.
const requestUserLists = (userID) => ({
  type: 'USER_LISTS_REQUEST',
  userID,
})

const receiveUserLists = (response) => ({
  type: 'USER_LISTS_RECEIVE',
  response,
})

export const fetchUserLists = (userID) => (dispatch, getState, api) => {
  if (getIsLoading(getState())) {
    return Promise.resolve()
  }

  dispatch(requestUserLists(userID))

  return api.fetchUserLists(userID)
    .then(response => normalize(response, userListsSchema))
    .then(response => dispatch(receiveUserLists(response)))
    .catch((err) => {
      // TODO: At App level, display error message w/o changing URL
      console.error(err)
      browserHistory.push('/404')
    })
}

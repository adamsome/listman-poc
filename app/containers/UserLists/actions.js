import { normalize } from 'normalizr'

import { getUser, getUserID, getIsLoading, getError } from './selectors'
import { userListsSchema } from '../../api/schemas'

const fetchAction = (type, userID, status, payload) => ({
  type,
  userID,
  status,
  payload,
})

const fetchUserLists = (userID) => (dispatch, getState, api) => {
  const type = 'USER_LISTS_FETCH'
  dispatch(fetchAction(type, userID))
  return api.fetchUserLists(userID)
    .then(response => {
      const userLists = normalize(response, userListsSchema)
      dispatch(fetchAction(type, userID, 'success', userLists))
    })
    .catch((err) => {
      console.error(err)
      dispatch(fetchAction(type, userID, 'error', err.message))
    })
}

const shouldFetchUserLists = (state, props) => {
  const user = getUser(state, props)
  if (!user || getError(state)) {
    return true
  } else if (getIsLoading(state)) {
    return false
  } else {
    // TODO: Support userList invalidation (i.e. `return user.didInvalidate`)
    return false
  }
}

export const fetchUserListsIfNeeded = (props) => (dispatch, getState) => {
  const state = getState()
  if (shouldFetchUserLists(state, props)) {
    const userID = getUserID(state, props)
    return dispatch(fetchUserLists(userID))
  } else {
    return Promise.resolve()
  }
}


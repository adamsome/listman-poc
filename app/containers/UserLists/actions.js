import { normalize } from 'normalizr'

import * as fromApp from '../../reducers'
import * as fromUsers from '../../reducers/users'
import { userListsSchema } from '../../api/schemas'

const fetchAction = (type, userID, status, payload) => ({
  type,
  userID,
  status,
  payload,
})

export const fetchUserLists = (userID) => (dispatch, getState, api) => {
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

const shouldFetchUserLists = (state, userID) => {
  const user = fromUsers.getUser(fromApp.getUsers(state), userID)
  if (!user || fromApp.getListsByUserError(state, userID)) {
    return true
  } else if (fromApp.getListsByUserIsLoading(state, userID)) {
    return false
  } else {
    // TODO: Support userList invalidation (i.e. `return user.didInvalidate`)
    return false
  }
}

export const fetchUserListsIfNeeded = (userID) => (dispatch, getState) => {
  if (shouldFetchUserLists(getState(), userID)) {
    return dispatch(fetchUserLists(userID))
  } else {
    return Promise.resolve()
  }
}


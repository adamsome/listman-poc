import { normalize } from 'normalizr'

import * as fromApp from '../../reducers'
import * as fromUsers from '../../reducers/users'
import { listSchema, userListsSchema } from '../../api/schemas'

const fetchAction = (type, userID, status, payload) => ({
  type,
  userID,
  status,
  payload,
})

export const fetchUserLists = (userID) => (dispatch, getState, api) => {
  const type = 'FETCH_USER_LISTS'
  dispatch(fetchAction(type, userID))
  return api.fetchUserLists(userID)
    .then(response => {
      const payload = normalize(response, userListsSchema)
      dispatch({ type, userID, status: 'success', payload })
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
  }
  // TODO: Support userList invalidation (i.e. `return user.didInvalidate`)
  return false
}

export const fetchUserListsIfNeeded = (userID) => (dispatch, getState) => {
  if (shouldFetchUserLists(getState(), userID)) {
    return dispatch(fetchUserLists(userID))
  }
  return Promise.resolve()
}

export const addList = (userID, name) => (dispatch, _, api) => {
  const type = 'ADD_LIST'
  dispatch({ type, userID })
  return api.addList(userID, name)
    .then(response => {
      const payload = normalize(response, listSchema)
      dispatch({ type, userID, status: 'success', payload })
    })
    .catch((error) => {
      console.error(error)
      dispatch({ type, userID, status: 'error', payload: error.message })
    })
}

import { normalize } from 'normalizr'

import * as fromApp from '../../reducers'
import * as fromUsers from '../../reducers/users'
import * as schema from '../../api/schemas'

const dispatchError = ({ dispatch, err, ...rest }) => {
  const unknown = !err.response || !err.response.data.error
  const error = (unknown) ? err : err.response.data.error
  const payload = error.message + ((unknown) ? ' (Unknown error)' : '')
  console.error(payload, error)
  dispatch({ ...rest, status: 'error', payload })
  throw err
}

// Fetch User

export const fetchUser = (userID) => (dispatch, _, api) => {
  const type = 'FETCH_USER'
  dispatch({ type, userID })
  return api.fetchUser(userID)
    .then(res => {
      const payload = normalize(res, schema.user)
      dispatch({ type, userID, status: 'success', payload })
    })
    .catch((err) => dispatchError({ dispatch, err, type, userID }))
}

const shouldFetchUser = (state, userID) => {
  const user = fromUsers.getUser(fromApp.getUsers(state), userID)
  if (!user || fromApp.getListsByUserError(state, userID)) {
    return true
  } else if (fromApp.getListsByUserIsLoading(state, userID)) {
    return false
  }
  // TODO: Support user invalidation (i.e. `return user.didInvalidate`)
  return false
}

export const fetchUserIfNeeded = (userID) => (dispatch, getState) => (
  (shouldFetchUser(getState(), userID))
    ? dispatch(fetchUser(userID))
    : Promise.resolve()
)

// Fetch User Lists

export const fetchUserLists = (userID) => (dispatch, _, api) => {
  const type = 'FETCH_USER_LISTS'
  dispatch({ type, userID })
  return api.fetchUserLists(userID)
    .then(res => {
      const payload = normalize(res, schema.listArray)
      dispatch({ type, userID, status: 'success', payload })
    })
    .catch((err) => dispatchError({ dispatch, err, type, userID }))
}

const shouldFetchUserLists = (state, userID) => {
  const userLists = fromApp.getListsByUser(state, userID)
  if (!userLists || fromApp.getListsByUserError(state, userID)) {
    return true
  } else if (fromApp.getListsByUserIsLoading(state, userID)) {
    return false
  }
  // TODO: Support userList invalidation (i.e. `return userList.didInvalidate`)
  return false
}

export const fetchUserListsIfNeeded = (userID) => (dispatch, getState) => (
  (shouldFetchUserLists(getState(), userID))
    ? dispatch(fetchUserLists(userID))
    : Promise.resolve()
)

// Add List

export const addList = (userID, name) => (dispatch, _, api) => {
  const type = 'ADD_LIST'
  dispatch({ type, userID })
  return api.addList(userID, name)
    .then(res => {
      const payload = normalize(res, schema.list)
      dispatch({ type, userID, status: 'success', payload })
    })
    .catch((err) => dispatchError({ dispatch, err, type, userID }))
}

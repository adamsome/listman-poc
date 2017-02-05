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

export const fetchUser = (username) => (dispatch, _, api) => {
  const type = 'FETCH_USER'
  dispatch({ type, username })
  return api.fetchUser(username)
    .then(res => {
      const payload = normalize(res, schema.user)
      dispatch({ type, username, status: 'success', payload })
    })
    .catch((err) => dispatchError({ dispatch, err, type, username }))
}

const shouldFetchUser = (state, username) => {
  const user = fromUsers.getUser(fromApp.getUsers(state), username)
  if (!user || fromApp.getListsByUserError(state, username)) {
    return true
  } else if (fromApp.getListsByUserIsLoading(state, username)) {
    return false
  }
  // TODO: Support user invalidation (i.e. `return user.didInvalidate`)
  return false
}

export const fetchUserIfNeeded = (username) => (dispatch, getState) => (
  (shouldFetchUser(getState(), username))
    ? dispatch(fetchUser(username))
    : Promise.resolve()
)

// Fetch User Lists

export const fetchUserLists = (username) => (dispatch, _, api) => {
  const type = 'FETCH_USER_LISTS'
  dispatch({ type, username })
  return api.fetchUserLists(username)
    .then(res => {
      const payload = normalize(res, schema.listArray)
      dispatch({ type, username, status: 'success', payload })
    })
    .catch((err) => dispatchError({ dispatch, err, type, username }))
}

const shouldFetchUserLists = (state, username) => {
  const userLists = fromApp.getListsByUser(state, username)
  if (!userLists || fromApp.getListsByUserError(state, username)) {
    return true
  } else if (fromApp.getListsByUserIsLoading(state, username)) {
    return false
  }
  // TODO: Support userList invalidation (i.e. `return userList.didInvalidate`)
  return false
}

export const fetchUserListsIfNeeded = (username) => (dispatch, getState) => (
  (shouldFetchUserLists(getState(), username))
    ? dispatch(fetchUserLists(username))
    : Promise.resolve()
)

// Add List

export const addList = (username, name) => (dispatch, _, api) => {
  const type = 'ADD_LIST'
  dispatch({ type, username })
  return api.addList(username, name)
    .then(res => {
      const payload = normalize(res, schema.list)
      dispatch({ type, username, status: 'success', payload })
    })
    .catch((err) => dispatchError({ dispatch, err, type, username }))
}

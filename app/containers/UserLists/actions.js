import { normalize } from 'normalizr'

import * as fromApp from '../../reducers'
import * as fromUsers from '../../reducers/users'
import * as schema from '../../api/schemas'

const dispatchError = ({ dispatch, err, ...rest }) => {
  const unknown = !err.response || !err.response.data.error
  const error = (unknown) ? err : err.response.data.error
  const payload = (unknown) ? `Unknown error on addList (${error.message})`
                            : `${error.message}`
  console.error(payload, error)
  dispatch({ ...rest, status: 'error', payload })
}

export const fetchUserLists = (userID) => (dispatch, getState, api) => {
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
  const user = fromUsers.getUser(fromApp.getUsers(state), userID)
  if (!user || fromApp.getListsByUserError(state, userID)) {
    return true
  } else if (fromApp.getListsByUserIsLoading(state, userID)) {
    return false
  }
  // TODO: Support userList invalidation (i.e. `return user.didInvalidate`)
  return false
}

export const fetchUserListsIfNeeded = (userID) => (dispatch, getState) => (
  (shouldFetchUserLists(getState(), userID))
    ? dispatch(fetchUserLists(userID))
    : Promise.resolve()
)

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

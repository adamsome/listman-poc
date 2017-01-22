import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import users from './users'
import lists, * as fromLists from './lists'
import listsByUser, * as fromListsByUser from './listsByUser'

export default combineReducers({
  users,
  lists,
  listsByUser,
  routing: routerReducer
})

export const getCurrentUserID = (_, props) => props.params.userID
export const getUsers = (state) => state.users
export const getLists = (state) => state.lists
export const getUserLists = (state) => state.listsByUser

export const getListsByUser = (state, userID) => {
  const listsByUser = fromListsByUser.getLists(getUserLists(state), userID)
  return (listsByUser)
    ? listsByUser.map(listID => fromLists.getList(getLists(state), listID))
    : undefined
}

export const getListsByUserIsLoading = (state, userID) =>
  fromListsByUser.getIsLoading(getUserLists(state), userID)

export const getListsByUserError = (state, userID) =>
  fromListsByUser.getError(getUserLists(state), userID)


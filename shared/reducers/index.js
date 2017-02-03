import { combineReducers } from 'redux'

import users from './users'
import lists, * as fromLists from './lists'
import listsByUser, * as fromListsByUser from './listsByUser'
import posts, * as FromPosts from './posts';

// -----------------------------------------------------------------------------
// REDUCER

export default combineReducers({
  users,
  lists,
  listsByUser,
  posts, // TODO: TEMP
})

// -----------------------------------------------------------------------------
// EXPORTED SELECTORS

export const getUsers = (state) => state.users
export const getLists = (state) => state.lists
export const getUserLists = (state) => state.listsByUser

export const getListsByUser = (state, username) => {
  const listsByUser = fromListsByUser.getLists(getUserLists(state), username)
  return (listsByUser)
    ? listsByUser.map(listID => fromLists.getList(getLists(state), listID))
    : undefined
}

export const getListsByUserIsLoading = (state, username) =>
  fromListsByUser.getIsLoading(getUserLists(state), username)

export const getListsByUserError = (state, username) =>
  fromListsByUser.getError(getUserLists(state), username)

export const getListsByUserIsAdding = (state, username) =>
  fromListsByUser.getIsAdding(getUserLists(state), username)

export const getListsByUserAddError = (state, username) =>
  fromListsByUser.getAddError(getUserLists(state), username)

export const getPostById = (state, id) =>
  FromPosts.getById(state.posts, id)

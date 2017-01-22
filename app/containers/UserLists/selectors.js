const getUsers = (state) => {
  return state.users
}

const getLists = (state) => {
  return state.lists
}

export const getUserID = (state, props) => props.params.userID

export const getUser = (state, props) => {
  const userID = getUserID(state, props)
  return getUsers(state)[userID]
}

export const getUserLists = (state, props) => {
  const user = getUser(state, props)
  const lists = getLists(state)
  return (user)
    ? user.lists.map(listID => lists[listID])
    : undefined
}

export const getIsLoading = (state) => {
  return state.isLoading
}

export const getError = (state) => {
  return state.error
}

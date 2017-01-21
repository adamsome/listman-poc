const getUsers = (state) => {
  return state.users
}

const getLists = (state) => {
  return state.lists
}

export const getUser = (state, props) => {
  const userID = props.params.userID
  return getUsers(state)[userID]
}

export const getUserLists = (state, props) => {
  const user = getUser(state, props)
  const lists = getLists(state)
  return (user)
    ? user.lists.map(listID => lists[listID])
    : undefined
}

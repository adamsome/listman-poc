const user = (action) => {
  if (action.status === 'success') {
    // Remove the lists key since its store in listsByUser
    const u = { ...action.payload.entities.users[action.userID] }
    delete u.lists
    return u
  }
}

const users = (state = {}, action) => {
  switch (action.type) {
  case 'USER_LISTS_FETCH':
    if (action.status === 'success' && action.payload) {
      return {
        ...state,
        [action.userID]: user(action),
        //...action.payload.entities.users,
      }
    }
    return state
  default:
    return state
  }
}

export default users

export const getUser = (state, id) => {
  return state[id]
}


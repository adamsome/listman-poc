const users = (state = {}, action) => {
  switch (action.type) {
  case 'FETCH_USER_LISTS':
  case 'FETCH_USER':
    if (action.status === 'success' && action.payload) {
      return {
        ...state,
        ...action.payload.entities.users,
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


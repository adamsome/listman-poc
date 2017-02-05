const lists = (state = {}, action) => {
  switch (action.type) {
  case 'FETCH_USER_LISTS':
    if (action.status === 'success') {
      return {
        ...state,
        ...action.payload.entities.lists,
      }
    }
    return state
  case 'ADD_LIST':
    if (action.status === 'success') {
      return {
        ...state,
        ...action.payload.entities.lists,
      }
    }
    return state
  default:
    return state
  }
}

export default lists

export const getList = (state, listID) => {
  return state[listID]
}

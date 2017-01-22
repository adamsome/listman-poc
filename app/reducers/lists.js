const lists = (state = {}, action) => {
  switch (action.type) {
  case 'USER_LISTS_FETCH':
    if (action.status === 'success' && action.payload) {
      return {
        ...state,
        ...action.payload.entities.lists,
      }
    }
    return state
  //case 'ADD_LIST':
    //return {
      //...state,
      //lists: [
        //...state.lists,
        //action.list,
      //]
    //}
  default:
    return state
  }
}

export default lists

export const getList = (state, listID) => {
  return state[listID]
}

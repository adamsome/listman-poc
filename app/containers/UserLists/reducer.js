export const users = (state = {}, action) => {
  switch (action.type) {
  case 'LISTS_RECEIVE':
    if (action.res) {
      return {
        ...state,
        ...action.res.entities.users,
      }
    }
    return state
  default:
    return state
  }
}

export const lists = (state = {}, action) => {
  switch (action.type) {
  case 'LISTS_RECEIVE':
    if (action.res) {
      return {
        ...state,
        ...action.res.entities.lists,
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


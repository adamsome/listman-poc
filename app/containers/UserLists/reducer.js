export const users = (state = {}, action) => {
  switch (action.type) {
  case 'USER_LISTS_RECEIVE':
    if (action.response) {
      return {
        ...state,
        ...action.response.entities.users,
      }
    }
    return state
  default:
    return state
  }
}

export const lists = (state = {}, action) => {
  switch (action.type) {
  case 'USER_LISTS_RECEIVE':
    if (action.response) {
      return {
        ...state,
        ...action.response.entities.lists,
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

export const isLoading = (state = false, action) => {
  switch (action.type) {
  case 'USER_LISTS_REQUEST':
    return true
  case 'USER_LISTS_RECEIVE':
    return false
  default:
    return state
  }
}

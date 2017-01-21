// export default reducer
export const users = (state = {}, action) => {
  switch (action.type) {
  case 'USER_LISTS_FETCH':
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

export const lists = (state = {}, action) => {
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

export const isLoading = (state = false, action) => {
  switch (action.type) {
  case 'USER_LISTS_FETCH':
    if (action.status === 'success' || action.status === 'error') {
      return false
    }
    return true
  default:
    return state
  }
}

export const error = (state = null, action) => {
  switch (action.type) {
  case 'USER_LISTS_FETCH':
    if (action.status === 'error') {
      return action.payload
    }
    return null
  default:
    return state
  }
}

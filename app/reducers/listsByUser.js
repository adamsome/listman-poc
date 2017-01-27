// Store user -> lists here
const lists = (state = undefined, action) => {
  const { type, status, payload } = action
  if (status !== 'success') {
    return state
  }
  switch (type) {
  case 'FETCH_USER_LISTS':
    //return payload.entities.users[action.userID].lists
    return payload.result
  case 'ADD_LIST':
    return [
      ...state,
      payload.result,
    ]
  default:
    return state
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
  case 'FETCH_USER_LISTS':
    // Status is not 'error' or 'success' so we are loading
    return (action.status) ? false : true
  default:
    return state
  }
}

const isAdding = (state = false, action) => {
  switch (action.type) {
  case 'ADD_LIST':
    // Status is not 'error' or 'success' so we are loading
    return (action.status) ? false : true
  default:
    return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
  case 'FETCH_USER_LISTS':
    if (action.status === 'error') {
      return action.payload
    }
    return null
  default:
    return state
  }
}

const addError = (state = null, action) => {
  switch (action.type) {
  case 'ADD_LIST':
    if (action.status === 'error') {
      return action.payload
    }
    return null
  default:
    return state
  }
}

const listsByUserEntry = (state = {}, action) => {
  return {
    lists: lists(state.lists, action),
    isLoading: isLoading(state.isLoading, action),
    isAdding: isAdding(state.isAdding, action),
    error: error(state.error, action),
    addError: addError(state.addError, action),
  }
}

const listsByUser = (state = {}, action) => {
  const { userID } = action
  if (userID) {
    return {
      ...state,
      [userID]: listsByUserEntry(state[userID], action),
    }
  }
  return state
}

export default listsByUser

export const getEntry = (state, userID) => {
  return state[userID]
}

export const getLists = (state, userID) => {
  const entry = getEntry(state, userID)
  return (entry) ? entry.lists : undefined
}

export const getIsLoading = (state, userID) => {
  const entry = getEntry(state, userID)
  return (entry) ? entry.isLoading : false
}

export const getIsAdding = (state, userID) => {
  const entry = getEntry(state, userID)
  return (entry) ? entry.isAdding : false
}

export const getError = (state, userID) => {
  const entry = getEntry(state, userID)
  return (entry) ? entry.error : null
}

export const getAddError = (state, userID) => {
  const entry = getEntry(state, userID)
  return (entry) ? entry.addError : null
}


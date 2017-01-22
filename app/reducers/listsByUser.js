const isLoading = (action) => {
  if (action.status === 'success' ||
      action.status === 'error') {
    return false
  }
  return true
}

const error = (action) => {
  if (action.status === 'error') {
    return action.payload
  }
  return null
}

// Store user -> lists here
const lists = (action) => {
  if (action.status === 'success') {
    return action.payload.entities.users[action.userID].lists
  }
}

const listsByUser = (state = {}, action) => {
  switch (action.type) {
  case 'USER_LISTS_FETCH':
    return {
      ...state,
      [action.userID]: {
        lists: lists(action),
        isLoading: isLoading(action),
        error: error(action),
      }
    }
  default:
    return state
  }
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

export const getError = (state, userID) => {
  const entry = getEntry(state, userID)
  return (entry) ? entry.error : null
}


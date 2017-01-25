const isLoading = (state = false, action) => {
  switch (action.type) {
  case 'FETCH_USER_LISTS':
    return !action.status
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

// Store user -> lists here
const lists = (state = [], action) => {
  const { type, status, payload } = action
  switch (type) {
  case 'FETCH_USER_LISTS':
    if (status === 'success') {
      return payload.entities.users[action.userID].lists
    }
    return state
  case 'ADD_LIST':
    if (status === 'success') {
      return [
        ...state,
        payload.result,
      ]
    }
    return state
  default:
    return state
  }
}

const listsByUserEntry = (state = {}, action) => {
  return {
    lists: lists(state.lists, action),
    isLoading: isLoading(state.isLoading, action),
    error: error(state.error, action),
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

export const getError = (state, userID) => {
  const entry = getEntry(state, userID)
  return (entry) ? entry.error : null
}


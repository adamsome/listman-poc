// Store user -> lists here
const lists = (state = undefined, action) => {
  const { type, status, payload } = action
  if (status !== 'success') {
    return state
  }
  switch (type) {
  case 'FETCH_USER_LISTS':
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
  case 'FETCH_USER':
    // Status is not 'error' or 'success' so we are loading
    return (action.status) ? false : true
  default:
    return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
  case 'FETCH_USER_LISTS':
  case 'FETCH_USER':
    if (action.status === 'error') {
      return action.payload
    }
    return null
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
    error: error(state.error, action),
    isAdding: isAdding(state.isAdding, action),
    addError: addError(state.addError, action),
  }
}

const listsByUser = (state = {}, action) => {
  const { username } = action
  if (username) {
    return {
      ...state,
      [username]: listsByUserEntry(state[username], action),
    }
  }
  return state
}

export default listsByUser

export const getEntry = (state, username) => {
  return state[username]
}

export const getLists = (state, username) => {
  const entry = getEntry(state, username)
  return (entry) ? entry.lists : undefined
}

export const getIsLoading = (state, username) => {
  const entry = getEntry(state, username)
  return (entry) ? entry.isLoading : false
}

export const getIsAdding = (state, username) => {
  const entry = getEntry(state, username)
  return (entry) ? entry.isAdding : false
}

export const getError = (state, username) => {
  const entry = getEntry(state, username)
  return (entry) ? entry.error : null
}

export const getAddError = (state, username) => {
  const entry = getEntry(state, username)
  return (entry) ? entry.addError : null
}


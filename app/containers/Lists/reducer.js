import { DEV_lists, DEV_userProfile } from '../../devUtil'

const initialState = {
  lists: [],
  user: DEV_userProfile,
}

function lists(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_LISTS':
    return {
      ...state,
      lists: DEV_lists
    }
  case 'ADD_LIST':
    return {
      ...state,
      lists: [
        ...state.lists,
        action.list,
      ]
    }
  default:
    return state
  }
}

export default lists

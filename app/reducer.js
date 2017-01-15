import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

function lists(state = {}, action) {
  switch (action.type) {
  case 'NOT_IMPLEMENTED':
    return state
  default:
    return state
  }
}

export default combineReducers({
  lists,
  routing: routerReducer
})

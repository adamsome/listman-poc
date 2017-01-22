import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { users, lists, isLoading, error } from './containers/UserLists/reducer'

export default combineReducers({
  users,
  lists,
  isLoading,
  error,
  routing: routerReducer
})

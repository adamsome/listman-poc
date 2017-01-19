import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { users, lists } from './containers/UserLists/reducer'

export default combineReducers({
  users,
  lists,
  routing: routerReducer
})

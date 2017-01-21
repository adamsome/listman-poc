import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import * as userLists from './containers/UserLists/reducer'

export default combineReducers({
  ...userLists,
  routing: routerReducer
})

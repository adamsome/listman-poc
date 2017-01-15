import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import lists from './containers/Lists/reducer'

export default combineReducers({
  lists,
  routing: routerReducer
})

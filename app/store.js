import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import reducer from './reducers'
import * as api from './api'

const middleware = [
  promiseMiddleware,
  thunk.withExtraArgument(api)
]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

export default function makeStore(initialState) {
  // If Redux DevTools Extension present, inject
  let composeEnhancers = compose
  if (process.env.NODE_ENV !== 'production' &&
      typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  )
}

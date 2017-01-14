import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router';

import routes from './routes';

//import { isBrowser } from './utils'
//export const history = isBrowser ? browserHistory : createMemoryHistory()

ReactDOM.render((
  <Router history={browserHistory} children={routes} />
), document.getElementById('app'))

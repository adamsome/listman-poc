import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App'
import Home from './containers/Home'
import UserLists from './containers/UserLists'
import NotFound from './components/NotFound'

export default (
  <Route path="/" component={App} name="app">
    <IndexRoute component={Home} />
    <Route path="404" component={NotFound} />
    <Route path=":userID" component={UserLists} />
    <Route path="*" component={NotFound} />
  </Route>
);

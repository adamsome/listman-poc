import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App'
import Home from './containers/Home'
import Lists from './containers/Lists'
import NotFound from './components/NotFound'

export default (
  <Route path="/" component={App} name="app">
    <IndexRoute component={Home} />
    <Route path="/lists/" component={Lists} />
    <Route path="*" component={NotFound} />
  </Route>
);

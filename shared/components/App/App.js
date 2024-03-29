import React from 'react'
import { Match, Miss } from 'react-router'

import UserLists from './UserLists';
import Home from './Home';
import Error404 from '../Error404';
import DevFooter from './DevFooter'

import './App.scss';

const App = () => (
  <div>
    <section className="section">
      <Match exactly pattern="/" component={Home} />
      <Match exactly pattern="/404" component={Error404} />
      <Match pattern="/:username" component={UserLists} />
      <Miss component={Error404} />
    </section>
    <DevFooter />
  </div>
)

export default App

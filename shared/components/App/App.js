import React from 'react'
import { Match, Miss } from 'react-router'

import AsyncHome from '../DemoApp/AsyncHome';
import AsyncPosts from '../DemoApp/AsyncPosts';
import Error404 from '../DemoApp/Error404';
import DevFooter from '../DevFooter'

import './App.scss';

const App = () => (
  <div>
    <section className="section">
      <Match exactly pattern="/" component={AsyncHome} />
      <Match pattern="/posts" component={AsyncPosts} />
      <Miss component={Error404} />
    </section>
    <DevFooter />
  </div>
)

export default App

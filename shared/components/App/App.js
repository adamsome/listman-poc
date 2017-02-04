import React from 'react'
import { Match, Miss } from 'react-router'

import AsyncHome from './AsyncHome';
import AsyncPosts from './AsyncPosts';
import Error404 from './Error404';
import DevFooter from './DevFooter'

import './App.scss';

const App = () => (
  <div>
    <section className="section">
      <Match exactly pattern="/" component={AsyncHome} />
      <Match exactly pattern="/404" component={Error404} />
      <Match pattern="/posts" component={AsyncPosts} />
      <Miss component={Error404} />
    </section>
    <DevFooter />
  </div>
)

export default App

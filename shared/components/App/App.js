import React from 'react'
import { Link, Match, Miss } from 'react-router'

import AsyncHome from '../DemoApp/AsyncHome';
import AsyncPosts from '../DemoApp/AsyncPosts';
import Error404 from '../DemoApp/Error404';

import Footer from '../Layout/Footer'
import BodyColumn from '../Layout/BodyColumn'
import Columns from '../Layout/Columns'
import Column from '../Layout/Columns/Column'

import './App.scss';

const App = () => (
  <div>
    <section className="section">
      <Match exactly pattern="/" component={AsyncHome} />
      <Match pattern="/posts" component={AsyncPosts} />
      <Miss component={Error404} />
    </section>
    <Footer>
      <BodyColumn>
        {/* Temp dev tools */}
        <h4 className="title is-4">Dev tools</h4>
        <Columns multiline>
          <Column>
            <strong>Temp</strong>
            <br />
            <Link to='/'>/[home]</Link>
            <br />
            <Link to='/posts'>/posts</Link>
          </Column>
          <Column>
            <strong>User links</strong>
            <br />
            <Link to='/adamsome'>/adamsome</Link>
            <br />
            <Link to='/other-user'>/other-user</Link>
            <br />
            <Link to='/long-maximum-length-user-name-32'>
              /long-maximum-length-user-name-32
            </Link>
            <br />
            <Link to='/not-a-user'>/not-a-user</Link>
          </Column>
        </Columns>
      </BodyColumn>
    </Footer>
  </div>
)

export default App

import React from 'react'
import { Link } from 'react-router'

import Footer from './components/Layout/Footer'
import BodyColumn from './components/Layout/BodyColumn'
import Columns from './components/Layout/Columns'
import Column from './components/Layout/Columns/Column'
import './App.scss'

export default class App extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div>
        <section className="section">
          {children}
        </section>
        <Footer>
          <BodyColumn>
            {/* Temp dev tools */}
            <h4 className="title is-4">Dev tools</h4>
            <Columns multiline>
              <Column>
                <strong>User links</strong>
                <br />
                <Link to='/adamsome'>/adamsome</Link>
                <br />
                <Link to='/other-user'>/other-user</Link>
                <br />
                <Link to='/not-a-user'>/not-a-user</Link>
              </Column>
            </Columns>
          </BodyColumn>
        </Footer>
      </div>
    )
  }
}

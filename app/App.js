import React from 'react'

import Footer from './components/Layout/Footer'
import Container from './components/Layout/Container'
import VersionInfo from './components/VersionInfo'
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
          <Container centered>
            <VersionInfo />
          </Container>
        </Footer>
      </div>
    )
  }
}

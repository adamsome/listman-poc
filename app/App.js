import React from 'react'

import Layout from './components/Layout'
import './App.css'

export default class App extends React.Component {
  render() {
    const { children } = this.props
    return (
      <Layout>
        { children }
      </Layout>
    )
  }
}
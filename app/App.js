import React from 'react'

import './App.scss'

export default class App extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div>
        <section className="section">
          {children}
        </section>
      </div>
    )
  }
}

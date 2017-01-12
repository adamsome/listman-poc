import React from 'react'

import './App.css'
import List from '../List'

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-header">
          Basic
        </h1>
        <List />
      </div>
    )
  }
}

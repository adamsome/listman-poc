import React from 'react'

import Item from '../../components/Item'

export default class List extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
  }

  render() {
    if (!this.state.items.length) {
      return <div>No Items!</div>
    }

    return (
      <div className="list">
        { this._renderItems() }
      </div>
    )
  }

  _renderItems() {
    return this.state.items.map((item, index) => {
      return (
        <Item
          key={ index }
          title={ item.title }
        />
      )
    })
  }
}

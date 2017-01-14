import React from 'react'

import Item from '../../components/Item'

export default class Lists extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
      //items: [{ title: 'Item 1' }, { title: 'Item 2' }]
    }
  }

  render() {
    if (!this.state.items.length) {
      return <div>No Items!</div>
    }

    return (
      <div className="lists">
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

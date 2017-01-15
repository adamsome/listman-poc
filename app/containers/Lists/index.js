import React from 'react'
import { connect } from 'react-redux';

import Item from '../../components/Item'
import { fetchLists } from './actions'

export class Lists extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchLists())
  }

  render() {
    const { lists } = this.props
    if (!lists.length) {
      return <div>No Items!</div>
    }

    return (
      <div className="lists">
        { this._renderItems() }
      </div>
    )
  }

  _renderItems() {
    const { lists } = this.props
    return lists.map((list, index) => {
      return (
        <Item
          key={ index }
          title={ list.title }
        />
      )
    })
  }
}

function mapStateToProps(state) {
  return {
    lists: state.lists.lists,
  }
}

export default connect(
  mapStateToProps
)(Lists)

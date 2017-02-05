import React from 'react';

import AddTileForm from './AddTileForm'
import './AddTile.scss'

export default class AddTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormOpen: false,
    };
  }

  render() {
    const { isLoading, isAdding, add } = this.props

    let className = "box tile__add"
    if (isLoading) {
      className += " tile--loading"
    } else if (this.state.isFormOpen) {
      className += " tile__add--form-open"
    } else {
      className += " level"
    }

    if (isAdding) {
      className += " tile__add--adding is-disabled"
    }

    let titleClassName = "tile__add__title title"
    if (isAdding) {
      titleClassName += " tile__add__title--adding"
    }

    return (
      <a
        className={className}
        onClick={() => this.setState({ isFormOpen: true })}
      >
        <span className="tile__add__title-wrapper level-item has-text-centered">
          {
            (!this.state.isFormOpen)
              ? <span className={titleClassName}>
                  {(isAdding) ? 'Adding...' : (isLoading) ? ' ' : '+'}
                </span>
              : <AddTileForm
                  add={add}
                  close={() => this.setState({ isFormOpen: false })}
                />
          }
        </span>
      </a>
    )
  }
}


import React from 'react'
import classNames from 'classnames'

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
    const { isAdding, add } = this.props

    const className = classNames({
      "box-tile": true,
      "box-tile--add": !this.state.isFormOpen,
      "level": !this.state.isFormOpen,
      "box-tile--add-form-open": this.state.isFormOpen,
      "is-disabled": isAdding,
    })
    const titleClassName = classNames({
      "box-tile__title": true,
      "box-tile__title--add": true,
      "box-tile__title--adding": isAdding,
    })

    return (
      <a
        className={className}
        onClick={() => this.setState({ isFormOpen: true })}
      >
        <span className="level-item">
          {
            (!this.state.isFormOpen)
              ? <span className={titleClassName}>
                  {(isAdding) ? 'Adding...' : '+'}
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


import React from 'react'
import { connect } from 'react-redux';

import ListTile from '../../components/ListTile'
import { fetchLists } from './actions'

export class Lists extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchLists())
  }

  render() {
    const { lists } = this.props
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-2">
            <article className="media">
              <figure className="media-left">
                <p className="image is-128x128">
                  <img
                    alt="User icon"
                    src="http://bulma.io/images/placeholders/256x256.png" />
                </p>
              </figure>
              <div className="media-content">
                <h1 className="title is-1">
                  adamsome
                </h1>
                <p className="subtitle is-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam ut eros non quam faucibus mattis quis quis sem.
                  Praesent cursus pretium leo, sit amet dignissim felis
                  vulputate at.
                </p>
              </div>
              <div className="media-right">
                <a className="card-header-icon">
                  <span className="icon is-large">
                    {/* TODO: Base off instagram's lighter icon */}
                    <i className="fa fa-ellipsis-h"></i>
                  </span>
                </a>
              </div>
            </article>
          </div>
        </div>
        <div className="columns">
          <div className="column is-10 is-offset-2">
            <h2 className="title is-2">
              Lists
            </h2>
            <div className="columns is-multiline">
              {this._renderItems(lists)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  _renderItems(lists) {
    if (!lists.length) {
      return <div>No Items!</div>
    }
    return lists.map((list, index) => {
      return (
        <div key={index} className="column is-one-quarter">
          <ListTile
            key={index}
            title={list.title}
          />
        </div>
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

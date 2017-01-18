import React from 'react'
import { connect } from 'react-redux';

import { fetchLists } from './actions'
import ListTiles from '../../components/ListTiles'
import MainColumns from '../../components/MainColumns'
import UserProfile from '../../components/UserProfile'

export class Lists extends React.Component {
  componentDidMount() {
    const { onFetchLists } = this.props
    onFetchLists()
  }

  render() {
    const { lists, user } = this.props
    return (
      <div className="container">
        <MainColumns>
          <UserProfile user={user} />
          <ListTiles lists={lists} />
        </MainColumns>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    lists: state.lists.lists,
    user: state.lists.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchLists: () => dispatch(fetchLists())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists)

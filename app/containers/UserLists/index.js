import React from 'react'
import { connect } from 'react-redux';

import { fetchUserLists } from './actions'
import { getUser, getUserLists } from './selectors'
import UserPage from '../../components/UserPage'

export class UserLists extends React.Component {
  componentDidMount() {
    const { userID } = this.props.params
    // TODO: Should fetch?
    this.fetchUserLists(userID)
  }

  componentDidUpdate(prevProps) {
    const { userID } = this.props.params
    if (userID === prevProps.params.userID) return
    // TODO: Should fetch?
    this.fetchUserLists(userID)
  }

  fetchUserLists(userID) {
    const { fetchUserLists } = this.props
    fetchUserLists(userID)
  }

  render() {
    const { user, lists } = this.props
    // TODO: get isLoading from state
    const isLoading = (user) ? false : true
    return <UserPage user={user} lists={lists} isLoading={isLoading} />
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: getUser(state, ownProps),
    lists: getUserLists(state, ownProps),
  }
}

export default connect(
  mapStateToProps,
  { fetchUserLists },
)(UserLists)

import React from 'react'
import { connect } from 'react-redux';

import { fetchUserLists } from './actions'
import { getUser, getUserLists, getIsLoading, getError } from './selectors'
import UserPage from '../../components/UserPage'
import NotFound from '../../components/NotFound'

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
    const { user, lists, isLoading, error } = this.props
    return (error)
      ? <NotFound error={error} />
      : <UserPage user={user} lists={lists} isLoading={isLoading} />
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: getUser(state, ownProps),
    lists: getUserLists(state, ownProps),
    isLoading: getIsLoading(state),
    error: getError(state),
  }
}

export default connect(
  mapStateToProps,
  { fetchUserLists },
)(UserLists)

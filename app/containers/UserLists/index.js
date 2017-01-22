import React from 'react'
import { connect } from 'react-redux';

import { fetchUserListsIfNeeded } from './actions'
import * as select from './selectors'
import UserPage from '../../components/UserPage'
import NotFound from '../../components/NotFound'

export class UserLists extends React.Component {
  componentDidMount() {
    this.fetchUserLists()
  }

  componentDidUpdate(prevProps) {
    // Fetch if user changed (or if previous user was undefined)
    const { userID } = this.props
    const prevUserID = prevProps.userID
    if (userID !== prevUserID) {
      console.log(`<UserLists> update fetch` +
                  `(user ${userID} != prevUser ${prevUserID})`)
      this.fetchUserLists()
    }
  }

  fetchUserLists() {
    this.props.fetchUserListsIfNeeded(this.props)
  }

  render() {
    const { user, lists, isLoading, error } = this.props
    return (error)
      ? <NotFound error={error} />
      : <UserPage user={user} lists={lists} isLoading={isLoading} />
  }
}

const mapStateToProps = (state, ownProps) => ({
  userID: select.getUserID(state, ownProps),
  user: select.getUser(state, ownProps),
  lists: select.getUserLists(state, ownProps),
  isLoading: select.getIsLoading(state),
  error: select.getError(state),
})

export default connect(
  mapStateToProps,
  { fetchUserListsIfNeeded },
)(UserLists)

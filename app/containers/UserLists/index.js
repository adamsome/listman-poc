import React from 'react'
import { connect } from 'react-redux';

import * as fromApp from '../../reducers'
import * as fromUsers from '../../reducers/users'
import { fetchUserListsIfNeeded, addList } from './actions'
import UserPage from '../../components/UserPage'
import NotFound from '../../components/NotFound'

export class UserLists extends React.Component {
  componentDidMount() {
    const { userID } = this.props
    this.fetchUserLists(userID)
  }

  componentDidUpdate(prevProps) {
    // Fetch if user changed (or if previous user was undefined)
    const { userID } = this.props
    const prevUserID = prevProps.userID
    if (userID !== prevUserID) {
      console.log(`<UserLists> update fetch` +
                  `(user ${userID} != prevUser ${prevUserID})`)
      this.fetchUserLists(userID)
    }
  }

  fetchUserLists(userID) {
    this.props.fetchUserListsIfNeeded(userID)
  }

  render() {
    const { user, lists, isLoading, error } = this.props
    return (error)
      ? <NotFound error={error} />
      : <UserPage user={user} lists={lists} isLoading={isLoading} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const userID = fromApp.getCurrentUserID(state, ownProps)
  return {
    userID,
    user: fromUsers.getUser(fromApp.getUsers(state), userID),
    lists: fromApp.getListsByUser(state, userID),
    isLoading: fromApp.getListsByUserIsLoading(state, userID),
    error: fromApp.getListsByUserError(state, userID),
  }
}

export default connect(
  mapStateToProps,
  { fetchUserListsIfNeeded, addList },
)(UserLists)


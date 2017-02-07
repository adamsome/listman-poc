import React from 'react'
import { connect } from 'react-redux';

import * as fromApp from '../../../reducers'
import * as fromUsers from '../../../reducers/users'
import { fetchUserIfNeeded, fetchUserListsIfNeeded, addList } from './actions'
import UserPage from './UserPage'
import Error404 from '../../Error404'

export class UserLists extends React.Component {
  componentDidMount() {
    const { username } = this.props
    this.fetchUserLists(username)
  }

  componentDidUpdate(prevProps) {
    // Fetch if user changed (or if previous user was undefined)
    const { username } = this.props
    const prevUsername = prevProps.username
    if (username !== prevUsername) {
      console.log(`<UserLists> update fetch` +
                  `(user ${username} != prevUser ${prevUsername})`)
      this.fetchUserLists(username)
    }
  }

  fetchUserLists(username) {
    this.props.fetchUserListsIfNeeded(username)
      .then(() => this.props.fetchUserIfNeeded(username))
      .catch(e => e) // Actions handle the errors
  }

  render() {
    const { username, user, lists, isLoading,
            error, isAdding, addError, addList } = this.props
    return (error)
      ? <Error404 error={error} />
      : <UserPage
          user={user}
          lists={lists}
          isLoading={isLoading}
          isAdding={isAdding}
          addError={addError}
          addList={(name) => addList(username, name)}
        />
  }
}

const mapStateToProps = (state, { params: { username } }) => ({
  username,
  user: fromUsers.getUser(fromApp.getUsers(state), username),
  lists: fromApp.getListsByUser(state, username),
  isLoading: fromApp.getListsByUserIsLoading(state, username),
  error: fromApp.getListsByUserError(state, username),
  isAdding: fromApp.getListsByUserIsAdding(state, username),
  addError: fromApp.getListsByUserAddError(state, username),
})

export default connect(
  mapStateToProps,
  { fetchUserIfNeeded, fetchUserListsIfNeeded, addList },
)(UserLists)


import { normalize } from 'normalizr'

import * as api from '../../api'
import { userListsSchema } from '../../api/schemas'

const requestUserLists = (userID) => ({
  type: 'USER_LISTS_REQUEST',
  userID,
})

const receiveUserLists = (response) => ({
  type: 'USER_LISTS_RECEIVE',
  response,
})

export const fetchUserLists = (userID) => (dispatch) => {
  dispatch(requestUserLists(userID))

  return api.fetchUserLists(userID)
    .then(response => normalize(response, userListsSchema))
    .then(response => {
      dispatch(receiveUserLists(response))
    })
}

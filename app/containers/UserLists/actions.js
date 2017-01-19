import { normalize } from 'normalizr'

import * as api from '../../api'
import { userListsSchema } from '../../api/schemas'

const receiveUserLists = (res) => ({
  type: 'USER_LISTS_RECEIVE',
  res,
})

export const fetchUserLists = (userID) =>
  api.fetchUserLists(userID).then(res =>
    receiveUserLists(normalize(res, userListsSchema))
  )

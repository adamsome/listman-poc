import * as api from '../../api'

const receiveLists = (res) => ({
  type: 'LISTS_RECEIVE',
  res,
})

export const fetchLists = (userID) =>
  api.fetchLists(userID).then(res =>
    receiveLists(res)
  )

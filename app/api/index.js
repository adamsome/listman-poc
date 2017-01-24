import { makeMockDB } from './mockDB'

const delayMS = 1000
const delay = (ms) => new Promise(res => setTimeout(res, ms))

const mockDB = makeMockDB()

export const mockUserListsResponse = (userID) => {
  return {
    ...mockDB.users[userID],
    lists: mockDB.userLists[userID].map(listID => mockDB.lists[listID])
  }
}

// TODO: Use real API
export const fetchUserLists = (userID) =>
  delay(delayMS).then(() => {
    const response = mockUserListsResponse(userID)
    if (response) {
      if (process.env.NODE_ENV === 'development')
        console.log('api-fetch-user-lists', response)
      return response
    } 
    throw new Error(`User ${userID} was not found.`)
  })

//export const addUserList

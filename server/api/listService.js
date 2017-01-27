import DB from './mockDB'

DB.debug = false

// Simulate network delay
const delay = (ms) => new Promise(res => setTimeout(res, ms))
const ms = 1000

export const getLists = (userID) => {
  return delay(ms).then(() => (
    DB.getUserLists(userID)
  ))
}

export const addList = (userID, list) => {
  return delay(ms).then(() => (
    DB.addList(userID, list.name)
  ))
}

import DB from './mockDB'

const delayMS = 1000
const delay = (ms) => new Promise(res => setTimeout(res, ms))

// TODO: Use real API
export const fetchUserLists = (userID) =>
  delay(delayMS).then(() => {
    return DB.getUserLists(userID)
  })

export const addList = (userID, name) =>
  delay(delayMS).then(() => {
    return DB.addList(userID, name)
  })


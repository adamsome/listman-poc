import DB from './mockDB'

DB.debug = false

// Simulate network delay
const delay = (ms) => new Promise(res => setTimeout(res, ms))
const ms = 1000

export const get = (userID) => {
  return delay(ms).then(() => (
    DB.getUser(userID)
  ))
}


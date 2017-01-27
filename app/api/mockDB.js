import uuidV4 from 'uuid/v4'

const avatar_url = 'http://bulma.io/images/placeholders/256x256.png'
const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                   'Nullam ut eros non quam faucibus mattis quis quis sem. ' +
                   'Praesent cursus pretium leo, sit amet dignissim felis ' +
                   'vulputate at.'

export const userIDs = [
  'adamsome',
  'other-user',
  'long-maximum-length-user-name-32',
]

export const listNames = [
  'Favorite Things of 2016',
  'Favorite Things of 2015',
  'Sample List No. 1 w/ many items',
  'List Two of Samples',
  'Third List of Samples with a very, very, long name',
  'Sample List IV',
  'Fifth Samples Listing',
  '666',
  '7th list of samples',
]

// Link user IDs by index with its owned list names by index
export const userListsByIndex = {
  0: [0, 1],
  1: [2, 3, 4, 5, 6, 7, 8],
  2: [],
}

// Construct user objects based on the array of user IDs
export const users = userIDs.map(id => ({
  id,
  description: loremIpsum,
  avatar: avatar_url,
}))

// Construct list objects based on the array of list names
export const lists = listNames.map((name, listIdx) => {
  // Determine list's owner by inspecting userListsByIndex
  const owner = Object.keys(userListsByIndex).reduce((owner, userIdx) => {
    return (userListsByIndex[userIdx].includes(listIdx))
      ? users[userIdx]
      : owner
  }, undefined)
  return {
    id: uuidV4(),
    name,
    owner,
  }
})

// Convert users array to a dictionary (key is user ID)
export const usersByID = users.reduce((acc, user) => {
  acc[user.id] = user
  return acc
}, {})

// Convert lists array to a dictionary (key is list ID)
export const listsByID = lists.reduce((acc, list) => {
  acc[list.id] = list
  return acc
}, {})

// Convert userListsByIndex to use the actual IDs (instead of indexes)
export const userListsByID = Object.keys(userListsByIndex).reduce((acc, i) => {
  acc[users[i].id] = userListsByIndex[i].map(j => lists[j].id)
  return acc
}, {})

class DB {
  constructor(users, lists, userLists) {
    this.users = users
    this.lists = lists
    this.userLists = userLists

    this.debug = process.env.NODE_ENV === 'development'
  }

  logDB() {
    if (this.debug) console.log('DB', this)
  }

  log() {
    if (this.debug) console.log.apply(this, arguments)
  }

  getUserLists(userID) {
    if (!this.users[userID]) {
      throw new Error(`User ${userID} was not found.`)
    }
    const lists = this.userLists[userID].map(listID => this.lists[listID])
    this.log('api-get-user-lists', lists)
    return lists
  }

  addList(userID, name) {
    if (!this.users[userID]) {
      throw new Error(`User ${userID} was not found.`)
    }
    if (!name) {
      throw new Error(`List name must not be blank.`)
    }
    const id = uuidV4()
    let list = { id, name, owner: userID }
    this.lists = { ...this.lists, [id]: list }
    this.userLists[userID] = [...this.userLists[userID], id]
    // Add full owner in API response
    list.owner = this.users[userID]
    this.log('api-add-lists', list)
    return list
  }
}

const db = new DB(usersByID, listsByID, userListsByID)
export default db


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
  // Determine list's author by inspecting userListsByIndex
  const author = Object.keys(userListsByIndex).reduce((userID, userIdx) => {
    return (userListsByIndex[userIdx].includes(listIdx))
      ? users[userIdx].id
      : userID
  }, undefined)
  return {
    id: uuidV4(),
    name,
    author,
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

export const makeMockDB = () => {
  return {
    users: usersByID,
    lists: listsByID,
    userLists: userListsByID,
  }
}


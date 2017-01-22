import uuidV4 from 'uuid/v4'

const delayMS = 1000
const delay = (ms) => new Promise(res => setTimeout(res, ms))

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                   'Nullam ut eros non quam faucibus mattis quis quis sem. ' +
                   'Praesent cursus pretium leo, sit amet dignissim felis ' +
                   'vulputate at.'

const fakeUserListsResponse = (userID) => {
  const lists = [{
      id: uuidV4(),
      name: 'Sample List No. 1 w/ many items',
    }, {
      id: uuidV4(),
      name: 'List Two of Samples',
    }, {
      id: uuidV4(),
      name: 'Third List of Samples with a very, very, long name',
    }, {
      id: uuidV4(),
      name: 'Sample List IV',
    }, {
      id: uuidV4(),
      name: 'Fifth Samples Listing',
  }]

  const users = {
    adamsome: {
      id: "adamsome",
      description: loremIpsum,
      avatar: 'http://bulma.io/images/placeholders/256x256.png',
      lists,
    },
    "other-user": {
      id: "other-user",
      description: loremIpsum,
      avatar: 'http://bulma.io/images/placeholders/256x256.png',
      lists: lists.slice(1, 3),
    }
  }
  return users[userID]
}

// TODO: Use real API
export const fetchUserLists = (userID) =>
delay(delayMS).then(() => {
  const response = fakeUserListsResponse(userID)
  if (response) {
    return response
  } 
  throw new Error(`User ${userID} was not found.`)
})


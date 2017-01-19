import uuidV4 from 'uuid/v4'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                   'Nullam ut eros non quam faucibus mattis quis quis sem. ' +
                   'Praesent cursus pretium leo, sit amet dignissim felis ' +
                   'vulputate at.'

const fakeUserListsResponse = () => {
  const lists = [{
      id: uuidV4(),
      title: 'Sample List No. 1 w/ many items',
    }, {
      id: uuidV4(),
      title: 'List Two of Samples',
    }, {
      id: uuidV4(),
      title: 'Third List of Samples with a very, very, long title',
    }, {
      id: uuidV4(),
      title: 'Sample List IV',
    }, {
      id: uuidV4(),
      title: 'Fifth Samples Listing',
  }]

  return {
    id: "adamsome",
    description: loremIpsum,
    avatar: 'http://bulma.io/images/placeholders/256x256.png',
    lists,
  }
}

// Normalizr user lists schema

// TODO: Move normalize to actions
// TODO: Use real API
export const fetchUserLists = (userID) =>
  delay(350).then(() => fakeUserListsResponse())

export const getLists = (userID) => {
  console.log('api.list.getLists.req', userID)
  const lists = [
    {
      id: '0',
      name: 'List 1',
      owner: {
        id: 'adamsome',
        description: 'Lorem ipsum',
        avatar: 'http://bulma.io/images/placeholders/256x256.png',
      },
    }, {
      id: '1',
      name: 'List 2',
      owner: {
        id: 'adamsome',
        description: 'Lorem ipsum',
        avatar: 'http://bulma.io/images/placeholders/256x256.png',
      },
    }
  ]
  console.log('api.list.getLists.res', lists)
  return new Promise(res => res(lists))
}

export const addList = (userID, list) => {
  console.log('api.list.addList.req', list)
  const addedList = { ...list, id: '999', owner: userID }
  console.log('api.list.addList.res', addedList)
  return new Promise(res => res(addedList))
}

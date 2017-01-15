const initialState = {
  lists: []
}

// TODO: Async load lists from server
const testLists = [
  { title: 'Sample List No. 1' },
  { title: 'List Two of Samples' },
  { title: 'Third List of Samples' },
]

function lists(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_LISTS':
    return {
      ...state,
      lists: testLists
    }
  default:
    return state
  }
}

export default lists

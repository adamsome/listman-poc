const initialState = {
  lists: []
}

// TODO: Async load lists from server
const testLists = [
  { title: 'Sample List No. 1 w/ many items' },
  { title: 'List Two of Samples' },
  { title: 'Third List of Samples with a very, very, long title' },
  { title: 'Sample List IV' },
  { title: 'Fifth Samples Listing' },
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

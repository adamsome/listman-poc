import { asyncTest } from '../../../config/jest/actionsUtil'
import * as api from '../../api'
import { fetchUserLists, fetchUserListsIfNeeded } from './actions'

const initialState = {
  users: {},
  lists: {},
  listsByUser: {},
}
const users = [{
  id: 0,
  username: 'other-user',
  description: 'desc',
  avatar_url: 'http://path/to/avatar',
}]
const lists = [
  { id: '0', name: 'List 1', owner: users[0].username },
  { id: '1', name: 'List 2', owner: users[0].username },
]

// Mock the API call made by the async action
const listsResponse = [
  { id: '0', name: 'List 1', owner: users[0] },
  { id: '1', name: 'List 2', owner: users[0] },
]
api.fetchUserLists = jest.fn().mockImplementation((username) =>
  Promise.resolve(listsResponse)
)

asyncTest({
  name: 'simulate fetch user lists',
  initialState,  
  action: fetchUserLists,
  params: [users[0].username],
  mockAPI: api,
  expectedActions: [{
      type: "FETCH_USER_LISTS",
      username: users[0].username,
    }, {
      type: "FETCH_USER_LISTS",
      username: users[0].username,
      status: 'success',
      payload: {
        entities: {
          lists: {
            [lists[0].id]: lists[0],
            [lists[1].id]: lists[1],
          },
          users: {
            [users[0].username]: users[0],
          },
        },
        result: [ lists[0].id, lists[1].id ],
      } 
  }],
})

asyncTest({
  name: 'simulates should fetch user lists',
  initialState,  
  action: fetchUserListsIfNeeded,
  params: [users[0].username],
  mockAPI: api,
  expectedActions: [{
      type: "FETCH_USER_LISTS",
      username: users[0].username,
    }, {
      type: "FETCH_USER_LISTS",
      username: users[0].username,
      status: 'success',
      payload: {
        entities: {
          lists: {
            [lists[0].id]: lists[0],
            [lists[1].id]: lists[1],
          },
          users: {
            [users[0].username]: users[0],
          },
        },
        result: [ lists[0].id, lists[1].id ],
      } 
  }],
})

asyncTest({
  name: 'simulates should not fetch user lists',
  initialState: {
    ...initialState,
    listsByUser: {
      [users[0].username]: { lists: [] },
    }
  },  
  action: fetchUserListsIfNeeded,
  params: [users[0].username],
  mockAPI: api,
  expectedActions: [],
})

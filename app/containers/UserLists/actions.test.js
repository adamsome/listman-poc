import { asyncTest } from '../../../config/jest/actionsUtil'
import * as api from '../../api'
import { fetchUserLists, fetchUserListsIfNeeded } from './actions'

const initialState = {
  users: {},
  lists: {},
  listsByUser: {},
}
const users = [{
  id: 'other-user',
  description: 'desc',
  avatar_url: 'http://path/to/avatar',
}]
const lists = [
  { id: '0', name: 'List 1', owner: users[0].id },
  { id: '1', name: 'List 2', owner: users[0].id },
]

// Mock the API call made by the async action
const listsResponse = [
  { id: '0', name: 'List 1', owner: users[0] },
  { id: '1', name: 'List 2', owner: users[0] },
]
api.fetchUserLists = jest.fn().mockImplementation((userID) =>
  Promise.resolve(listsResponse)
)

asyncTest({
  name: 'simulate fetch user lists',
  initialState,  
  action: fetchUserLists,
  params: [users[0].id],
  mockAPI: api,
  expectedActions: [{
      type: "FETCH_USER_LISTS",
      userID: users[0].id,
      status: undefined,
      payload: undefined,
    }, {
      type: "FETCH_USER_LISTS",
      userID: users[0].id,
      status: 'success',
      payload: {
        entities: {
          lists: {
            [lists[0].id]: lists[0],
            [lists[1].id]: lists[1],
          },
          users: {
            [users[0].id]: users[0],
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
  params: [users[0].id],
  mockAPI: api,
  expectedActions: [{
      type: "FETCH_USER_LISTS",
      userID: users[0].id,
      status: undefined,
      payload: undefined,
    }, {
      type: "FETCH_USER_LISTS",
      userID: users[0].id,
      status: 'success',
      payload: {
        entities: {
          lists: {
            [lists[0].id]: lists[0],
            [lists[1].id]: lists[1],
          },
          users: {
            [users[0].id]: users[0],
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
      [users[0].id]: { lists: [] },
    }
  },  
  action: fetchUserListsIfNeeded,
  params: [users[0].id],
  mockAPI: api,
  expectedActions: [],
})

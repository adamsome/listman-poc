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
  avatar: 'http://path/to/avatar',
}]
const lists = [
  { id: '0', name: 'List 1' }
]

const apiFetchUserListsMockResponse = {
  ...users[0],
  lists,
}
const apiFetchUserListsMock = (userID) =>
  Promise.resolve(apiFetchUserListsMockResponse)

// Mock the API call made by the async action
api.fetchUserLists = jest.fn().mockImplementation(apiFetchUserListsMock)
asyncTest({
  testName: 'simulate fetch user lists',
  initialState,  
  action: fetchUserLists,
  params: [users[0].id],
  mockAPI: api,
  expectedActions: [{
      type: "USER_LISTS_FETCH",
      userID: users[0].id,
      status: undefined,
      payload: undefined,
    }, {
      type: "USER_LISTS_FETCH",
      userID: users[0].id,
      status: 'success',
      payload: {
        entities: {
          lists: {
            [lists[0].id]: lists[0],
          },
          users: {
            [users[0].id]: {
              ...users[0],
              lists: [ lists[0].id ],
            },
          },
        },
        result: users[0].id,
      } 
  }],
})

asyncTest({
  testName: 'simulates should fetch user lists',
  initialState,  
  action: fetchUserListsIfNeeded,
  params: [users[0].id],
  mockAPI: api,
  expectedActions: [{
      type: "USER_LISTS_FETCH",
      userID: users[0].id,
      status: undefined,
      payload: undefined,
    }, {
      type: "USER_LISTS_FETCH",
      userID: users[0].id,
      status: 'success',
      payload: {
        entities: {
          lists: {
            [lists[0].id]: lists[0],
          },
          users: {
            [users[0].id]: {
              ...users[0],
              lists: [ lists[0].id ],
            },
          },
        },
        result: users[0].id,
      } 
  }],
})

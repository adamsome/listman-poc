import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import reducer from './listsByUser'

const action = 'USER_LISTS_FETCH'
const makeRequestAction = (type, userID) => ({
  type,
  userID,
  // Extraneous, should be ignored
  payload: {entities: {users: {[userID]: {lists: [1, 2]}}}}
})
const makeErrorAction = (type, userID, err) => ({
  type,
  userID,
  status: 'error',
  payload: err
})
const makeAction = (type, status, user) => ({
  type,
  status,
  userID: user.id,
  payload: {
    entities: {
      users: {
        [user.id]: user,
      }
    }
  }
})
const user1 = {
  id: 'username',
  description: 'a description',
  avatar: 'http://path/to/avatar',
  lists: [1, 2, 3],
}
const existingState1 = {
  lists: [4, 2, 9],
  isLoading: false,
  error: "message",
}

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({})
})

it('should return loading when no status given', () => {
  expect(reducer({}, makeRequestAction(action, user1.id))).toEqual({
    [user1.id]: {
      lists: undefined,
      isLoading: true,
      error: null,
    }
  })
})

it('should return error & no loading when error status given', () => {
  expect(reducer({}, makeErrorAction(action, user1.id, 'err'))).toEqual({
    [user1.id]: {
      lists: undefined,
      isLoading: false,
      error: 'err',
    }
  })
})

it('should include user lists on success', () => {
  expect(reducer({}, makeAction(action, 'success', user1))).toEqual({
    [user1.id]: {
      lists: user1.lists,
      isLoading: false,
      error: null,
    }
  })

  expect(
    reducer({existing: existingState1}, makeAction(action, 'success', user1))
  ).toEqual({
    existing: existingState1,
    [user1.id]: {
      lists: user1.lists,
      isLoading: false,
      error: null,
    }
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import reducer from './listsByUser'

const action = 'USER_LISTS_FETCH'
const makeAction = (type, user, status, payload) => ({
  type,
  userID: user.id,
  status,
  // If no payload, generate automatically
  payload: (status && payload) ? payload : {
    entities: {
      users: { [user.id]: user },
      lists,
    },
  },
})
const users = [{
  id: 'other-user',
  description: 'a description',
  avatar: 'http://path/to/avatar',
}]
const lists = {
  '0': { id: '0', name: 'List1' },
  '1': { id: '1', name: 'List2' },
  '3': { id: '3', name: 'List3' },
}
const user1 = {
  ...users[0],
  lists: Object.keys(lists),
}
const existingState = {
  lists: ['4', '2', '9'],
  isLoading: false,
  error: "message",
}

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({})
})

it('should return loading when no status given', () => {
  expect(
    reducer({}, makeAction(action, user1))
  ).toEqual({
    [users[0].id]: {
      lists: undefined,
      isLoading: true,
      error: null,
    }
  })
})

it('should return error & no loading when error status given', () => {
  expect(
    reducer({}, makeAction(action, user1, 'error', 'err'))
  ).toEqual({
    [users[0].id]: {
      lists: undefined,
      isLoading: false,
      error: 'err',
    }
  })
})

it('should include user lists on success', () => {

  expect(
    reducer({}, makeAction(action, user1, 'success'))
  ).toEqual({
    [user1.id]: {
      lists: user1.lists,
      isLoading: false,
      error: null,
    }
  })

  expect(
    reducer(
      {existingState},
      makeAction(action, user1, 'success')
    )
  ).toEqual({
    existingState,
    [user1.id]: {
      lists: user1.lists,
      isLoading: false,
      error: null,
    }
  })
})

it('should replace existing user list', () => {
  expect(
    reducer(
      {[user1.id]: existingState},
      makeAction(action, user1, 'success')
    )
  ).toEqual({
    [user1.id]: {
      lists: user1.lists,
      isLoading: false,
      error: null,
    }
  })
})

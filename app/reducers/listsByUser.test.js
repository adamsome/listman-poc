import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { makeMockDB } from '../api/mockDB'
import reducer from './listsByUser'

const db = makeMockDB()
const user = {
  ...db.users['adamsome'],
  lists: db.userLists['adamsome']
}
const lists = db.lists
console.log('user', user)

const existingState = {
  lists: ['4', '2', '9'],
  isLoading: false,
  error: "message",
}

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

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({})
})

it('should return loading when no status given', () => {
  expect(
    reducer({}, makeAction(action, user))
  ).toEqual({
    [user.id]: {
      lists: undefined,
      isLoading: true,
      error: null,
    }
  })
})

it('should return error & no loading when error status given', () => {
  expect(
    reducer({}, makeAction(action, user, 'error', 'err'))
  ).toEqual({
    [user.id]: {
      lists: undefined,
      isLoading: false,
      error: 'err',
    }
  })
})

it('should include user lists on success', () => {

  expect(
    reducer({}, makeAction(action, user, 'success'))
  ).toEqual({
    [user.id]: {
      lists: user.lists,
      isLoading: false,
      error: null,
    }
  })

  expect(
    reducer(
      {existingState},
      makeAction(action, user, 'success')
    )
  ).toEqual({
    existingState,
    [user.id]: {
      lists: user.lists,
      isLoading: false,
      error: null,
    }
  })
})

it('should replace existing user list', () => {
  expect(
    reducer(
      {[user.id]: existingState},
      makeAction(action, user, 'success')
    )
  ).toEqual({
    [user.id]: {
      lists: user.lists,
      isLoading: false,
      error: null,
    }
  })
})

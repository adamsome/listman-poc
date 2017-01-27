import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import db from '../../server/api/mockDB'
import reducer from './listsByUser'

const user = {
  ...db.users['adamsome'],
  lists: db.userLists['adamsome']
}
const lists = db.lists

const existingState = {
  lists: ['4', '2', '9'],
  isLoading: false,
  error: "message",
  isAdding: false,
  addError: null
}

const fetchAction = 'FETCH_USER_LISTS'
const addAction = 'ADD_LIST'
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
    result: user.lists
  },
})

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({})
})

it('fetch should return loading when no status given', () => {
  expect(
    reducer({}, makeAction(fetchAction, user))
  ).toEqual({
    [user.id]: {
      lists: undefined,
      isLoading: true,
      error: null,
      isAdding: false,
      addError: null,
    }
  })
})

it('add should return loading when no status given', () => {
  expect(
    reducer({}, makeAction(addAction, user))
  ).toEqual({
    [user.id]: {
      lists: undefined,
      isLoading: false,
      error: null,
      isAdding: true,
      addError: null,
    }
  })
})

it('fetch error should return error & no loading', () => {
  expect(
    reducer({}, makeAction(fetchAction, user, 'error', 'err'))
  ).toEqual({
    [user.id]: {
      lists: undefined,
      isLoading: false,
      error: 'err',
      isAdding: false,
      addError: null,
    }
  })
})

it('add error should return error & no adding', () => {
  expect(
    reducer({}, makeAction(addAction, user, 'error', 'err'))
  ).toEqual({
    [user.id]: {
      lists: undefined,
      isLoading: false,
      error: null,
      isAdding: false,
      addError: 'err',
    }
  })
})

it('fetch should include user lists on success', () => {

  expect(
    reducer({}, makeAction(fetchAction, user, 'success'))
  ).toEqual({
    [user.id]: {
      lists: user.lists,
      isLoading: false,
      error: null,
      isAdding: false,
      addError: null,
    }
  })

  expect(
    reducer(
      {existingState},
      makeAction(fetchAction, user, 'success')
    )
  ).toEqual({
    existingState,
    [user.id]: {
      lists: user.lists,
      isLoading: false,
      error: null,
      isAdding: false,
      addError: null,
    }
  })
})

it('fetch should replace existing user list', () => {
  expect(
    reducer(
      {[user.id]: existingState},
      makeAction(fetchAction, user, 'success')
    )
  ).toEqual({
    [user.id]: {
      lists: user.lists,
      isLoading: false,
      error: null,
      isAdding: false,
      addError: null,
    }
  })
})

it('add should add to existing user lists on success', () => {
  const payload = {
    result: '123'
  }
  expect(
    reducer(
      {[user.id]: existingState},
      makeAction(addAction, user, 'success', payload)
    )
  ).toEqual({
    [user.id]: {
      lists: [ ...existingState.lists, payload.result ],
      isLoading: false,
      error: existingState.error,
      isAdding: false,
      addError: null,
    }
  })
})


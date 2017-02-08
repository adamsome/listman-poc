/* eslint-disable import/no-extraneous-dependencies */

import reducer from './listsByUser'

const user = {
  id: 0,
  username: 'other-user',
  description: 'desc',
  avatar_url: 'url/',
}

const userLists = [ 0, 1 ]

const lists = {
  0: { id: 0, name: 'list1' },
  1: { id: 1, name: 'list2' },
}

const existingState = {
  lists: [4, 2, 9],
  isLoading: false,
  error: "message",
  isAdding: false,
  addError: null
}

const fetchAction = 'FETCH_USER_LISTS'
const addAction = 'ADD_LIST'
const makeAction = (type, user, status, payload) => ({
  type,
  username: user.username,
  status,
  // If no payload, generate automatically
  payload: (status && payload) ? payload : {
    entities: {
      users: { [user.username]: user },
      lists,
    },
    result: userLists
  },
})

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({})
})

it('fetch should return loading when no status given', () => {
  expect(
    reducer({}, makeAction(fetchAction, user))
  ).toEqual({
    [user.username]: {
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
    [user.username]: {
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
    [user.username]: {
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
    [user.username]: {
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
    [user.username]: {
      lists: userLists,
      isLoading: false,
      error: null,
      isAdding: false,
      addError: null,
    }
  })

  expect(
    reducer(
      {'some-other-user': existingState},
      makeAction(fetchAction, user, 'success')
    )
  ).toEqual({
    'some-other-user': existingState,
    [user.username]: {
      lists: userLists,
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
      {[user.username]: existingState},
      makeAction(fetchAction, user, 'success')
    )
  ).toEqual({
    [user.username]: {
      lists: userLists,
      isLoading: false,
      error: null,
      isAdding: false,
      addError: null,
    }
  })
})

it('add should add to existing user lists on success', () => {
  const payload = {
    result: 123
  }
  expect(
    reducer(
      {[user.username]: existingState},
      makeAction(addAction, user, 'success', payload)
    )
  ).toEqual({
    [user.username]: {
      lists: [ ...existingState.lists, payload.result ],
      isLoading: false,
      error: existingState.error,
      isAdding: false,
      addError: null,
    }
  })
})


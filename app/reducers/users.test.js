import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import reducer from './users'

const action = 'FETCH_USER_LISTS'
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
  avatar_url: 'http://path/to/avatar',
}
const user2 = {
  id: 'other-user',
  description: 'other description',
  avatar_url: 'http://path/to/other/avatar',
}

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({})
})

it('should do nothing on FETCH_USER_LISTS w/ non-success status', () => {
  expect(
    reducer({}, makeAction(action, 'not-success', user1))
  ).toEqual({})
})

it('returns a new user on FETCH_USER_LISTS w/ success', () => {
  expect(
    reducer({}, makeAction(action, 'success', user1))
  ).toEqual({
    [user1.id]: user1,
  })

  expect(
    reducer(
      {[user2.id]: user2},
      makeAction(action, 'success', user1)
    )
  ).toEqual({
    [user2.id]: user2,
    [user1.id]: user1,
  })
})

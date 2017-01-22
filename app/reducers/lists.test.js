import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import reducer from './lists'

const action = 'USER_LISTS_FETCH'
const makeAction = (type, status, list) => ({
  type,
  status,
  payload: {
    entities: {
      lists: {
        [list.id]: list,
      }
    }
  }
})
const list1 = {
  id: '1',
  name: 'a name',
}
const list2 = {
  id: '2',
  name: 'another name',
}

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({})
})

it('should do nothing on USER_LISTS_FETCH w/ no success and payload', () => {
  expect(
    reducer({}, makeAction(action, 'not-success', list1))
  ).toEqual({})

  expect(
    reducer({}, { type: action, status: 'success' })
  ).toEqual({})
})

it('has a new list on USER_LISTS_FETCH w/ success', () => {
  expect(
    reducer({}, makeAction(action, 'success', list1))
  ).toEqual({
    [list1.id]: list1,
  })

  expect(
    reducer(
      {[list2.id]: list2},
      makeAction(action, 'success', list1)
    )
  ).toEqual({
    [list2.id]: list2,
    [list1.id]: list1,
  })
})

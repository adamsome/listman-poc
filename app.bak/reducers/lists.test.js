import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import reducer from './lists'

const action = 'FETCH_USER_LISTS'
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

it('should do nothing on FETCH_USER_LISTS w/ no success', () => {
  expect(
    reducer({}, makeAction(action, 'not-success', list1))
  ).toEqual({})
})

it('has a new list on FETCH_USER_LISTS w/ success', () => {
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

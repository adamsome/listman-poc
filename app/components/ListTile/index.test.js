import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import ListTile from './index'

let wrapper
beforeEach(() => {
  wrapper = shallow(<ListTile title='ListTile Title' />)
})

it('shows title', () => {
  expect(wrapper.type()).toEqual('a')
  expect(wrapper.contains('ListTile Title')).toBe(true)
  expect(toJson(wrapper)).toMatchSnapshot()
})


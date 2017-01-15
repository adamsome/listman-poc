import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Item from './index'

let wrapper
beforeEach(() => {
  wrapper = shallow(<Item title='One' />)
})

it('renders correctly', () => {
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('shows title', () => {
  expect(wrapper.type()).toEqual('div')

  let title = wrapper.childAt(0)
  expect(title.type()).toEqual('p')
  expect(title.text()).toEqual('One')
})


import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Layout from './index'

let wrapper
beforeEach(() => {
  wrapper = shallow(<Layout />)
})

it('renders correctly', () => {
  expect(toJson(wrapper)).toMatchSnapshot()
})


import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Home from './index'

it('renders correctly', () => {
  const wrapper = shallow(<Home />)
  expect(toJson(wrapper)).toMatchSnapshot()
})


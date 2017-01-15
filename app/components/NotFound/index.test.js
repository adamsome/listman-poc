import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import NotFound from './index'

it('renders correctly', () => {
  const wrapper = shallow(<NotFound />)
  expect(toJson(wrapper)).toMatchSnapshot()
})


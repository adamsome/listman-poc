import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import App from './App'

let wrapper
beforeEach(() => {
  wrapper = shallow(<App />)
})

it('renders correctly', () => {
  expect(toJson(wrapper)).toMatchSnapshot()
})

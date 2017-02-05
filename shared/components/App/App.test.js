/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import { shallow } from 'enzyme'

import App from './App'

let wrapper
beforeEach(() => {
  wrapper = shallow(<App />)
})

it('renders correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

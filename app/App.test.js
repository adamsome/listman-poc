import React from 'react'
import { shallow } from 'enzyme'

import App from './App'
import Layout from './components/Layout'

describe('<App>', () => {
  it('exists', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toBeDefined()
  })

  it('renders as a <div>', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.type()).toEqual(Layout)
  })
})
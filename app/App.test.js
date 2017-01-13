import React from 'react'
import { shallow } from 'enzyme'

import App from './App'

describe('<App>', () => {
  it('exists', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toBeDefined()
  })

  it('renders as a <div>', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.type()).toEqual('div')
  })
})

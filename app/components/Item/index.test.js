import React from 'react'
import { shallow } from 'enzyme'

import Item from './index'

let wrapper

test('<Item>', () => {
  beforeEach(() => {
    wrapper = shallow(<Item title='One' />)
  })

  it('exists', () => {
    expect(wrapper).toBeDefined()
  })

  it('shows title', () => {
    expect(wrapper.type()).toEqual('div')

    let title = wrapper.childAt(0)
    expect(title.type()).toEqual('p')
    expect(title.text()).toEqual('One')
  })
})


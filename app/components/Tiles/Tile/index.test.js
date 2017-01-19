import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Tile from './index'

let wrapper
const tileName = 'Tile Name'
beforeEach(() => {
  wrapper = shallow(<Tile name={tileName} />)
})

it('shows name', () => {
  expect(wrapper.type()).toEqual('a')
  expect(wrapper.contains(tileName)).toBe(true)
  expect(toJson(wrapper)).toMatchSnapshot()
})


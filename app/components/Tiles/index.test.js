import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Tiles from './index'
import Tile from './Tile'

it('renders null based on initial state (empty "list" array)', () => {
  const wrapper = shallow(<Tiles entities={[]}/>)
  expect(wrapper.contains(<div>No Items!</div>)).toBe(true)
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders <div> w/ correct children of type <Tile>', () => {
  const name = 'Test One'
  const wrapper = shallow(<Tiles entities={[ { name } ]}/>)
  expect(wrapper.find(Tile)).toHaveLength(1)

  const child = wrapper.find(Tile).first()
  const childProps = child.props()
  expect(childProps.name).toEqual(name)
  expect(toJson(wrapper)).toMatchSnapshot()
})


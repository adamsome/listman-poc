import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import ListTiles from './index'
import ListTile from './ListTile'

it('renders null based on initial state (empty "list" array)', () => {
  const wrapper = shallow(<ListTiles lists={[]}/>)
  expect(wrapper.contains(<div>No Items!</div>)).toBe(true)
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders <div> w/ correct children of type <ListTile>', () => {
  const title = 'Test One'
  const wrapper = shallow(<ListTiles lists={[ { title } ]}/>)
  expect(wrapper.find(ListTile)).toHaveLength(1)

  const child = wrapper.find(ListTile).first()
  const childProps = child.props()
  expect(childProps.title).toEqual(title)
  expect(toJson(wrapper)).toMatchSnapshot()
})


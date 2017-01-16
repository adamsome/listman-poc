import React from 'react'
import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { Lists } from './index'
import ListTile from '../../components/ListTile'

it('renders null based on initial state (empty "list" array)', () => {
  const wrapper = shallow(<Lists lists={[]}/>)
  expect(wrapper.contains(<div>No Items!</div>)).toBe(true)
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders <div> w/ correct children of type <Item>', () => {
  const wrapper = shallow(<Lists lists={[ { title: 'Test One' } ]}/>)
  expect(wrapper.find(ListTile)).toHaveLength(1)

  const child = wrapper.find(ListTile).first()
  const childProps = child.props()
  expect(child.type()).toEqual(ListTile)
  expect(childProps.title).toEqual('Test One')
  expect(toJson(wrapper)).toMatchSnapshot()
})

//it('calls componentDidMount', () => {
  //spyLifecycle(List);

  //const props = {
    //onMount: () => {},
    //isActive: false
  //}

  //mount(<List {...props} />);

  //expect(List.prototype.componentDidMount.calledOnce).to.be.true;
//})


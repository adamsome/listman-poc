import React from 'react'
import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Lists from './index'
import Item from '../../components/Item'

let wrapper
beforeEach(() => {
  wrapper = shallow(<Lists />)
})

it('renders null based on initial state (empty "list" array)', () => {
  expect(wrapper.state().items).toBeInstanceOf(Array)
  expect(wrapper.state().items.length).toEqual(0)
  expect(wrapper.html()).toContain("No Items")
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders <div> w/ correct children of type <Item>', () => {
  wrapper.setState({
    items: [
      { title: 'One' }
    ]
  })
  expect(wrapper.state().items).toBeInstanceOf(Array)
  expect(wrapper.state().items.length).toEqual(1)
  expect(wrapper.find('.lists')).toHaveLength(1)

  const child = wrapper.childAt(0)
  const childProps = child.props()

  expect(child.type()).toEqual(Item)
  expect(childProps.title).toEqual('One')
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


import React from 'react'
import { mount, shallow } from 'enzyme'

import List from './index'
import Item from '../../components/Item'

let wrapper

describe('<List>', () => {
  beforeEach(() => {
    wrapper = mount(<List />)
  })

  it('exists', () => {
    expect(wrapper).toExist
  })

  it('renders null based on initial state (empty "list" array)', () => {
    expect(wrapper.state().items).toBeInstanceOf(Array)
    expect(wrapper.state().items.length).toEqual(0)
    expect(wrapper.html()).toContain("No Items")
  })

  it('renders <div> w/ correct children of type <Item>', () => {
    wrapper.setState({
      items: [
        { title: 'One' }
      ]
    })
    expect(wrapper.state().items).toBeInstanceOf(Array)
    expect(wrapper.state().items.length).toEqual(1)
    expect(wrapper.find('.list')).toHaveLength(1)

    const child = wrapper.childAt(0)
    const childProps = child.props()

    expect(child.type()).toEqual(Item)
    expect(childProps.title).toEqual('One')
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
})


import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { Lists } from './index'

it('renders correctly', () => {
  const wrapper = shallow(
    <Lists
      user={{
        username: "test_username",
        description: "description of user",
        avatar: "http://path/to/avatar",
      }}
      lists={[
        { title: "list title" }
      ]}
    />)
  expect(toJson(wrapper)).toMatchSnapshot()
})

// TODO: Test that fetchLists called once on mount
//it('calls componentDidMount', () => {
  //spyLifecycle(List);

  //const props = {
    //onMount: () => {},
    //isActive: false
  //}

  //mount(<List {...props} />);

  //expect(List.prototype.componentDidMount.calledOnce).to.be.true;
//})


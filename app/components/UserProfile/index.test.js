import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import UserProfile from './index'

it('renders correctly', () => {
  const wrapper = shallow(
    <UserProfile
      user={{
        id: "test_username",
        description: "description of user",
        avatar: "http://path/to/avatar",
      }}
    />
  )
  expect(toJson(wrapper)).toMatchSnapshot()
})


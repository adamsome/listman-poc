import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import UserProfile from './index'

it('renders correctly', () => {
  const wrapper = shallow(
    <UserProfile
      user={{
        id: 0,
        username: "test_username",
        description: "description of user",
        avatar_url: "http://path/to/avatar",
      }}
    />
  )
  expect(toJson(wrapper)).toMatchSnapshot()
})


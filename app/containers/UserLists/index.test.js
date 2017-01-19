import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import { UserLists } from './index'
import UserPage from '../../components/UserPage'

it('passes isLoading false when user defined', () => {
  const wrapper = shallow(
    <UserLists
      user={{
        username: "test_username",
        description: "description of user",
        avatar: "http://path/to/avatar",
      }}
      lists={[
        { title: "list title" }
      ]}
    />
  )
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('passes isLoading true when user undefined', () => {
  const wrapper = shallow(
    <UserLists />
  )
  const child = wrapper.find(UserPage).first()
  expect(child.props().isLoading).toBe(true)
})

it('fetches on mount', () => {
  const mockFetch = jest.fn()
  const wrapper = mount(
    <UserLists
      fetchLists={mockFetch}
      params={{userID: "test_username"}}
      user={{
        username: "test_username",
        description: "description of user",
        avatar: "http://path/to/avatar",
      }}
      lists={[
        { title: "list title" }
      ]}
    />
  )
  expect(mockFetch.mock.calls.length).toBe(1)
})

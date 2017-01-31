import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import { UserLists } from './index'
import UserPage from '../../components/UserPage'
import NotFound from '../../components/NotFound'

it('renders correctly', () => {
  const wrapper = shallow(
    <UserLists
      isLoading={false}
      user={{
        username: "test_username",
        description: "description of user",
        avatar_url: "http://path/to/avatar",
      }}
      lists={[
        { title: "list title" }
      ]}
    />
  )
  expect(wrapper.find(UserPage)).toHaveLength(1)
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders <NotFound> on error', () => {
  const wrapper = shallow(
    <UserLists error="User not found"/>
  )
  expect(wrapper.find(NotFound)).toHaveLength(1)
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('fetches on mount', () => {
  const mockFetch = jest.fn(() => Promise.resolve())
  const mockFetch2 = jest.fn(() => Promise.resolve())
  const wrapper = mount(
    <UserLists
      fetchUserListsIfNeeded={mockFetch}
      fetchUserIfNeeded={mockFetch}
      params={{username: "test_username"}}
      user={{
        username: "test_username",
        description: "description of user",
        avatar_url: "http://path/to/avatar",
      }}
      lists={[
        { title: "list title" }
      ]}
    />
  )
  expect(mockFetch.mock.calls.length).toBe(1)
})

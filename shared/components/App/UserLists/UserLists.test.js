/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import { shallow, mount } from 'enzyme'

import { UserLists } from './UserLists'
import UserPage from './UserPage'
import Error404 from '../../Error404'

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
  expect(wrapper).toMatchSnapshot()
})

it('renders <Error404> on error', () => {
  const wrapper = shallow(
    <UserLists error="User not found"/>
  )
  expect(wrapper.find(Error404)).toHaveLength(1)
  expect(wrapper).toMatchSnapshot()
})

it('fetches on mount', () => {
  const mockFetch = jest.fn(() => Promise.resolve())
  const mockFetch2 = jest.fn(() => Promise.resolve())
  const wrapper = mount(
    <UserLists
      fetchUserListsIfNeeded={mockFetch}
      fetchUserIfNeeded={mockFetch2}
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

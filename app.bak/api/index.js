import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
})

export const fetchUser = (username) => (
  request.get(`/users/${username}`)
    .then((res) => res.data)
)

export const fetchUserLists = (username) => (
  request.get(`/users/${username}/lists`)
    .then((res) => res.data)
)

export const addList = (username, name) => (
  request.post(`/users/${username}/lists`, { name })
    .then((res) => res.data)
)


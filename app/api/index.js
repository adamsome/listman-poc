import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
})

export const fetchUser = (userID) => (
  request.get(`/users/${userID}`)
    .then((res) => res.data)
)

export const fetchUserLists = (userID) => (
  request.get(`/users/${userID}/lists`)
    .then((res) => res.data)
)

export const addList = (userID, name) => (
  request.post(`/users/${userID}/lists`, { name })
    .then((res) => res.data)
)


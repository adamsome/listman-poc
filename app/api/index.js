import axios from 'axios'

const serverUrl    = 'http://localhost:3000'
const apiPath      = `${serverUrl}/api/v1`

export const fetchUser = (userID) => (
  axios.get(`${apiPath}/users/${userID}`)
    .then((res) => res.data)
)

export const fetchUserLists = (userID) => (
  axios.get(`${apiPath}/users/${userID}/lists`)
    .then((res) => res.data)
)

export const addList = (userID, name) => (
  axios.post(`${apiPath}/users/${userID}/lists`, { name })
    .then((res) => res.data)
)


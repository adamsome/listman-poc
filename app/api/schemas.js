import { schema } from 'normalizr'

const listSchema = new schema.Entity('lists')
const userListsSchema = new schema.Entity('users', { 
  lists: [ listSchema ]
})

export { userListsSchema }

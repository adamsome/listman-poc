import { schema } from 'normalizr'

export const user = new schema.Entity('users')
export const list = new schema.Entity('lists', {
  owner: user,
})
export const listArray = [ list ]
//const userListsSchema = new Schema.Entity('users', { 
  //lists: [ listSchema ]
//})


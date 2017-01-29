import pgPromise from 'pg-promise'

const config = {
  host: 'localhost',
  port: 5432,
  database: 'listman',
  user: 'listman_user'
};

const pgp = pgPromise()
const db = pgp(config)
const users = db.one('select * from users where username=$1', 'superuser')
  .then((data) => {
    console.log('users', data)
  })

db.any(`
  select
    l.id,
    l.name,
    l.updated_at,
    row_to_json(u.*) as owner
  from lists l, users u
  where
    l.owner = (select id from users where username = $1) and
    u.username = $1
  `,
  'adamsome')
  .then((data) => console.log('lists[adamsome]', data))


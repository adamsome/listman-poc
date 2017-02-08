const handleError = (msg) => (err) => {
  const e = new Error()
  e.message = msg
  e.inner = err
  throw e
}

const users = (db, pgp) => ({

  find: (username) =>
    db.one(`
      select u.*
      from users u
      where u.username = $1
      `,
      username
    ).catch(handleError(`User '${username}' not found.`)),
})

export default users

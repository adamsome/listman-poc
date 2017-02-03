const users = (db, pgp) => ({

  find: (username) => 
    db.one(`
      select u.*
      from users u
      where u.username = $1
      `,
      username
    ),
})

export default users

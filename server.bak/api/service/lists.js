const lists = (db, pgp) => ({

  byUser: (username) =>
    db.any(`
      select l.*, row_to_json(u.*) as owner
      from lists l, users u
      where
        l.owner = (select id from users where username = $1) and
        u.username = $1
      `,
      username
    ),

  add: (username, list) =>
    db.one(`
      insert into lists (name, owner)
      values(
        $1,
        (select id from users where username = $2)
      )
      returning *
      `,
      [ list.name, username ]
    ),
})

export default lists

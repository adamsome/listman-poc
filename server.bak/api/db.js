import pgPromise from 'pg-promise'

// TODO: Inject services into pg-promise
import userService from './service/users'
import listService from './service/lists'

const services = {
  users: userService,
  lists: listService,
}

const options = {
  extend: (obj) => {
    Object.keys(services).forEach(s => {
      obj[s] = services[s](obj, pgp)
    })
  }
}

const pgp = pgPromise(options)

const config = {
  host: 'localhost',
  port: 5432,
  database: 'listman',
  user: 'listman_user'
};

const db = pgp(config)

// TODO: Load and initialize optional diagnostics:
//var diag = require('./diagnostics');
//diag.init(options);

// To change default pool size, use:
// pgp.pg.defaults.poolSize = 20;

// To later access the library's root (pgp object): db.$config.pgp
export default db;

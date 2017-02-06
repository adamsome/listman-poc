const clientOrigin = (req, res, next) => {
  // Website you wish to allow to connect
  // TODO: Drive from config
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1337');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods',
                'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers',
                'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
}

export default clientOrigin

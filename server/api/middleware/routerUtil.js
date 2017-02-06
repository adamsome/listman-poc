// Simulate network delay
const delay = (ms) => new Promise(res => setTimeout(res, ms))
const ms = 1000

export const handleError = (err, req, res) => {
  const e = new Error()
  e.name = err.name
  e.message = err.message
  console.error(e)
  if (err.inner) console.log(err.inner)
  res.status(err.status || 500).json({ error: e })
  res.end()
}

const handleRequest = (handler) => (req, res) =>
  delay(ms).then(() =>
    handler(req)
      .then(result => res.json(result))
      .catch(error => handleError(error, req, res))
  )

export const makeMethods = (app) => ({
  get: (url, handler) => app.get(url, handleRequest(handler)),
  post: (url, handler) => app.post(url, handleRequest(handler)),
})


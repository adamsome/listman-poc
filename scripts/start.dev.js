import 'babel-polyfill'

// Ensure environment variables are set
import setEnvDefault from '../config/env'
setEnvDefault("NODE_ENV", "development")
setEnvDefault("PORT", 3000)
setEnvDefault("HOST", 'localhost')

import server from '../server'


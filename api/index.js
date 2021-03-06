const express = require('express')
const cors = require('cors')

// Create express instance
const app = express()

// Require API routes
const auth = require('./routes/auth')
const upload = require('./routes/drive')

// Import API Routes
app.use(cors())
app.use(express.json());
app.use(auth)
app.use(upload)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}

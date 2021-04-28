const express = require('express')
require('dotenv').config()
const app = express()
const FlavourRoutes = require('./routes/FlavourRoutes')
const UserRoutes = require('./routes/UserRoutes')
const MixRoutes = require('./routes/MixRoutes')
const Logger = require('./middleware/Logger')
const RouteErrorHandler = require('./error/routeErrrorHandler')
const PORT = process.env.PORT

app.use(express.json())
app.use(Logger)
app.use('/api/v1', FlavourRoutes, UserRoutes, MixRoutes)

app.use(RouteErrorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
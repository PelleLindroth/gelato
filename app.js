const express = require('express')
const app = express()
const FlavourRoutes = require('./routes/Flavours')
const UserRoutes = require('./routes/Users')
const MixRoutes = require('./routes/Mixes')
const Logger = require('./middleware/Logger')
const RouteErrorHandler = require('./error/routeErrrorHandler')
const PORT = 5000

app.use(express.json())
app.use(Logger)
app.use('/api/v1', FlavourRoutes, UserRoutes, MixRoutes)

app.use(RouteErrorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
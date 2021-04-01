const express = require('express')
const app = express()
const FlavourRoutes = require('./routes/Flavours')
const Logger = require('./middleware/Logger')
const PORT = 5000

app.use(express.json())
app.use(Logger)
app.use(FlavourRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
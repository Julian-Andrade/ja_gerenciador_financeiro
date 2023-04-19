const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

const PORT = 3333

app.use(express.json())
app.use(cors())

require('./routes/index')(app)

app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}`)
})

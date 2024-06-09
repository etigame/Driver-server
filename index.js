const express = require('express')
const app = express()
const PORT = 3000

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.static('root/public'))

const fileRouter = require('./router/file.router')
app.use('/file', fileRouter)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
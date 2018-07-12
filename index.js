const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const middleware = require('./utils/middleware')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const commentsRouter = require('./controllers/comments')
const config = require('./utils/config')

mongoose
    .connect(config.url)
    .then(() => {
    console.log('connected to database', config.url)
    })
    .catch(error => {
    console.log(error)
})

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)
app.use(express.static('build'))
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', commentsRouter)

const server =  http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
    mongoose.connection.close()
})

module.exports = {
    app,
    server
}

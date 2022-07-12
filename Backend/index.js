const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const configData = require('./config')
const mongoDB = 'mongodb+srv://' + configData.userName + ':' + configData.password + '@' + configData.connectionString + '/' + configData.dbName + '?retryWrites=true&w=majority';


mongoose.set('useFindAndModify', false)
mongoose.connect(mongoDB, {
    useUnifiedTopology: true,
    poolSize: 50,
    useNewUrlParser: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000
})
mongoose.Promise = global.Promise;

mongoose.connection
    .on('connected', () => {
        console.log('Mongoose default connection connected')
    })
    .on('error', (err) => {
        console.log('Mongoose default connection error: ' + err)
    })
    .on('disconnected', () => {
        console.log('Mongoose default connection disconnected')
    })

// if the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination')
        process.exit(0)
    })
})

app.use(cors())
app.use(bodyParser.json())
app.use('/', require('./router'))

const http = require('http').Server(app)
http.listen(configData.port, () => {
    console.log('API running on ' + configData.port + ' port!')
})

module.exports = app
/**
 * created @ 10/24/17 2:34 PM
 * with PhpStorm
 * by Kamaal ABOOTHALIB <kamaal.aboothalib@gmail.com>
 * for questions_api
 */
const EventEmitter = require('events')
    , logger = require('./config/logger')
    , config = require('./config/config.json')
    , { connect } = require('./db')
    , eventEmitter = new EventEmitter()
    , repo = require('./repos/Questions')

process.on('uncaughtException', (err) => {
    logger.log('error', err)
})

process.on('uncaughtRejection', (err, promise) => {
    logger.log('error', err)
})

connect(config.dbConnectionPath, {useMongoClient: true}, eventEmitter)
eventEmitter.emit('app.ready')
eventEmitter.on('db.connected', (mongoose, isConnected) => {
    logger.log('info', 'DB Connected', {k: isConnected})
    repo.connect(mongoose)
        .then(d => console.log(d))
})
eventEmitter.on('db.connectionError', (error) => {logger.log('info', error)})
eventEmitter.on('db.connectionClose', (type, message) => logger.log('info',type, message))
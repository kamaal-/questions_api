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
    , repository = require('./repos/Questions')
    , server = require('./server/server')

process.on('uncaughtException', (err) => {
    logger.log('error', err)
})

process.on('uncaughtRejection', (err, promise) => {
    logger.log('error', err)
})

connect(config.dbConnectionPath, {useMongoClient: true}, eventEmitter)
eventEmitter.emit('app.ready')
eventEmitter.on('db.connected', (db, isConnected) => {
    logger.log('info', 'DB Connected', {k: isConnected})
    let _repository = null
    repository.connect(db)
        .then(repo => {
            _repository = repo
            return server.start({port: config.port, repo})
        })
        .then(app => {
            console.log(`Express started at http://localhost:${config.port}`)
            app.on('close', () => _repository.disconnect())
        })
})

eventEmitter.on('db.connectionError', (error) => {logger.log('info', error)})
eventEmitter.on('db.connectionClose', (type, message) => logger.log('info',type, message))
/**
 * created @ 10/25/17 8:36 AM
 * with PhpStorm
 * by Kamaal ABOOTHALIB <kamaal.aboothalib@gmail.com>
 * for questions_api
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const connect = function(dbConnectionPath, options, eventEmitter) {
    eventEmitter.once('app.ready', () => {
        mongoose.connect(dbConnectionPath, options)
            .then(a => eventEmitter.emit('db.connected', mongoose, mongoose.connection.readyState))
            .catch(error => eventEmitter.emit('db.connectionError', error) )
        process.on('SIGINT', () => { mongoose.disconnect(); eventEmitter.emit('db.connectionClose', '\n Node stopped', {'message': 'DB Connection closed'}); process.exit(0); } )
    })
}

module.exports = Object.assign({}, {connect})
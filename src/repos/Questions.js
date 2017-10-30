/**
 * created @ 10/25/17 1:25 PM
 * with PhpStorm
 * by Kamaal ABOOTHALIB <kamaal.aboothalib@gmail.com>
 * for questions_api
 */
const model = require('../models/Question')

const repo = mongoose => {
    const Question = model.createModel(mongoose)
            .then( model => model)

    const getAll = (req, res) => {
        return Question.find({}, {})
    }

    const disconnect = () => {
        mongoose.disconnect()
    }

    return {
        getAll,
        disconnect
    }
}

const connect = mongoose => {
    return new Promise((resolve, reject) => {
        // mongoose.connection.readyState  >>>  0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
        if(mongoose.connection.readyState !== 1){
            reject(new Error('DB connection not valid'))
        }
        resolve(repo(mongoose))
    })
}

module.exports = Object.assign({}, {connect})
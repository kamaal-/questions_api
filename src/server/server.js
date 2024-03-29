/**
 * created @ 10/30/17 3:13 PM
 * with PhpStorm
 * by Kamaal ABOOTHALIB <kamaal.aboothalib@gmail.com>
 * for questions_api
 */

const express = require('express')
    , morgan = require('morgan')
    , helmet = require('helmet')
    , bodyParser = require('body-parser')
    , questionRouter = require('../routes/')

const start = options => {
    return new Promise((resolve, reject) => {
        if (!options.repo) {
            reject(new Error('server must started with connected repo'))
        }

        if(!options.port) {
            reject(new Error('server must started with available port'))
        }

        const app = express()

        /*
         * HTTP LOGGER
         */
        app.use(morgan('dev'))

        /*
         * Security
         */
        app.use(helmet())

        /*
         * Body parser
         */
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.text())
        app.use(bodyParser.json({ type: 'application/json'}))

        app.use((err, req, res, next) => {
            reject(new Error('Something went wrong!, err:' + err))
            res.status(500).send('Something went wrong!')
        })
        questionRouter(app, options)
        const server = app.listen(options.port, () => resolve(server))
    })
}

module.exports = Object.assign({}, {start})
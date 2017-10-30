/**
 * created @ 10/28/17 3:43 PM.
 * with PhpStorm
 * by kamaal <kamaal.aboothalib@gmail.com>
 * for questions_api.
 */
const httpStatus = require('http-status')

module.exports = (app, options) => {
    const { repo } = options

    app.get('/', (req, res) => {
        res.status(httpStatus.OK).send('HELLO WORLD')
    })
    app.get('/questions?', (req, res, next) => {
        repo.getAll()
            .then(questions => res.status(httpStatus.OK).json(questions))
            .catch(next)
    })
}
/**
 * created @ 10/25/17 11:34 AM
 * with PhpStorm
 * by Kamaal ABOOTHALIB <kamaal.aboothalib@gmail.com>
 * for questions_api
 */

const model = mongoose => {
    const Schema = mongoose.Schema
        , questionSchema = new Schema({
        body: {type: String, required: 'Kindly send Content'},
        year: {type: Number, required: 'Kindly send year', min: 4, max: 4},
        createdBy: {type: Schema.Types.ObjectId, required : 'Author id '}
    })
    return mongoose.model('Question', questionSchema)
}

const createModel = mongoose => {
    return new Promise((resolve, reject) => {
        mongoose.connection.readyState !== 1 && reject(new Error('db connection'))
        resolve(model(mongoose))
    })
}

module.exports = Object.assign({}, {createModel})
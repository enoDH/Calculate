let { Schema ,model } = require('mongoose')

const schema = new Schema({
    vyraz: { type: String, require: true},
})

module.exports = model('Vyraz', schema);
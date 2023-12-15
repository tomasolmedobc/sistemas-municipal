const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const telefonosSchema = new Schema({
        "n_interno": String,
        "oficina": String,
        "referente": String
},  {versionKey:false})

module.exports = mongoose.model('telefonos', telefonosSchema)
const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const impresoraSchema = new Schema({
        "nombre_area": String,
        "establecimiento": String,
        "impresora_numero": String,
        "impresora_modelo": String,
        "toner_descripcion":String
},  {versionKey:false})

module.exports = mongoose.model('impresoras', impresoraSchema)
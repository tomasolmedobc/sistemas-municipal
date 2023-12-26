const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comprobanteSchema = new Schema({
    "receptor_": String,
    "area_entrega": String,
    "emisor_": String,
    "observacion": String,
    "fecha": Date
}, { versionKey: false });

module.exports = mongoose.model('comprobantes', comprobanteSchema);

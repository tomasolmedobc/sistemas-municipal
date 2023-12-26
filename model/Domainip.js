const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const domainipSchema = new Schema({
    "ip_libres": String,
    "nombre_usuario": String,
    "observacion": String,
    "hostname": String
}, { versionKey: false });

module.exports = mongoose.model('domainip', domainipSchema);

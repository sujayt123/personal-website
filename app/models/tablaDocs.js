var mongoose = require('mongoose')

var tablaDocSchema = new mongoose.Schema({
    taal: String,
    laya: String,
    comp: String,
    bols: String,
    gharana: String
});

mongoose.model('tabladocs', tablaDocSchema);
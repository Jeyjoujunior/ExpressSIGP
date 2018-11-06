'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var InterfaceSchema = Schema({
    tittle: String,
    code: String,
    status: String,
    reqsons: String, 
    intdaughters: String,
    intmothers: String, 
    docfathers: String
});

module.exports = mongoose.model('Interfaces', InterfaceSchema)
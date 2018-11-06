'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var DocumentSchema = Schema({
    code: String,
    status: String,
    reqsons: String, 
    intdaughters: String,
    docsons: String, 
    docfathers: String
});

module.exports = mongoose.model('Documents', DocumentSchema)
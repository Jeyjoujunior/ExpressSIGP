'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var RequirementSchema = Schema({
    code: String,
    status: String,
    reqsons: String, 
    reqfathers: String,
    intmothers: String, 
    docfathers: String
});

module.exports = mongoose.model('Requirements', RequirementSchema)
'use strict'

var Document = require('../models/documents');

function createDocument(req, res){
    var document = new Document()
    document.code = req.body.code;
    document.status = "Analysis in progress";
    document.reqsons = req.body.reqsons;
    document.intdaughters = req.body.intdaughters;
    document.docsons = req.body.docsons;
    document.docfathers = req.body.docfathers;
    document.save(function(err, data){
        if(err) throw res.status(500).send(err.messsage)
        return res.status(203).send("Created")
    });
}

function getDocuments(req, res){
    Document.find({}, function (err, data){
        if(err) throw res.status(500).send(err.messsage)
        return res.status(200).send(data)
    });
}

function getDocument(req, res){
    var document_id = req.params.id
    Document.findById(document_id, function (err, data){
        if(err) throw res.status(500).send(err.messsage)
        return res.status(200).send(data)
    });
}

/*function insertImage(req, res){
    var imagePath = req.files.image.path;
    var movieId = req.params.id;
    User.findOneAndUpdate({_id:movieId}, {image:imagePath}, function (err, user){
        if(err) throw res.status(500).send(err.messsage)
        res.status(200).send(imagePath);
    });
}*/

function updateDocument(req, res){
    var id = req.params.id;
    var document_body = req.body;
    Document.findByIdAndUpdate(id, document_body, function (err, data){
        if(err) throw res.status(500).send(err.messsage)
        res.status(200).send(data)
    });
}

function deleteDocument(req, res){
    var id = req.params.id;

    Document.findByIdAndRemove(id, function (err, data){
        if(err) throw res.status(500).send(err.messsage)
        res.status(200).send("Deleted")
    });
}

module.exports = {
    createDocument,
    getDocuments,
    getDocument,
    updateDocument, 
    deleteDocument,
};
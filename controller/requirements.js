'use stricts'

var Requirement = require('../models/requirements');

function createRequirement(req, res){
    var requirement = new Requirement()
    requirement.code = req.body.code;
    requirement.status = "Analysis in progress";
    requirement.reqsons = req.body.reqsons;
    requirement.intdaughters = req.body.intdaughters;
    requirement.docsons = req.body.docsons;
    requirement.docfathers = req.body.docfathers;
    requirement.save(function(err, data){
        if(err) throw res.status(500).send(err.messsage)
        return res.status(203).send("Created")
    });
}

function getRequirements(req, res){
    Requirement.find({}, function (err, data){
        if(err) throw res.status(500).send(err.messsage)
        return res.status(200).send(data)
    });
}

function getRequirement(req, res){
    var requirement_id = req.params.id
    Requirement.findById(requirement_id, function (err, data){
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

function updateRequirement(req, res){
    var id = req.params.id;
    var requirement_body = req.body;
    Requirement.findByIdAndUpdate(id, requirement_body, function (err, data){
        if(err) throw res.status(500).send(err.messsage)
        res.status(200).send(data)
    });
}

function deleteRequirement(req, res){
    var id = req.params.id;

    Requirement.findByIdAndRemove(id, function (err, data){
        if(err) throw res.status(500).send(err.messsage)
        res.status(200).send("Deleted")
    });
}

module.exports = {
    createRequirement,
    getRequirements,
    getRequirement,
    updateRequirement, 
    deleteRequirement,
};
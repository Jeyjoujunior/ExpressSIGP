'use stricts'

var Interface = require('../models/interfaces');

function createInterface(req, res){
    var interface = new Interface()
    console.log(req.body.id)
    console.log(req.body.titulo)
    console.log(req.body.estado)
    interface.code = req.body.id;
    interface.status = req.body.estado;
    interface.tittle = req.body.titulo;
    interface.reqsons = req.body.reqsons;
    interface.intdaughters = req.body.intdaughters;
    interface.docsons = req.body.docsons;
    interface.docfathers = req.body.docfathers;
    interface.save(function(err, data){
        if(err) throw res.status(500).send(err.messsage)
        return res.status(203).send()
    });
}

function getInterfaces(req, res){
    Interface.find({}, function (err, data){
        if(err) throw res.status(500).send()
        console.log(data);
        
        return res.status(200).send(data)
    });
}

function getInterface(req, res){
    var interface_id = req.params.id
    Interface.findById(interface_id, function (err, data){
        if(err) throw res.status(500).send(err.messsage)
        return res.status(200).send(data)
    });
}

function borrarporformularioInterface(req, res){
    var informacion = req.params.id
    Interface.findOne(informacion, function (err, data){
        if(err) throw res.status(500).send(err.messsage)
        res.status(200).send(data)
        var id = data._id;
        // Primero buscamos si la interfaz existe, si es asi procedemos a buscarla porel ID para borrarla
        Interface.findByIdandDelete({id}, function(err, Interface){
                if(!Interface){
                    console.log("Interfaz no encontrada para ser borrada")
                    res.status(400).send("Interfaz no encontrada para ser borrada")
                }else{
                    Interface.findByIdAndRemove(Interface._id, function (err, Interface){
                        if(err) throw res.status(500).send(err.messsage)
                        res.status(200).send("Interface " + Interface.code + " Deleted")
                });
                }
            });
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

function updateInterface(req, res){
    var id = req.params.id;
    var interface_body = req.body;
    Interface.findByIdAndUpdate(id, interface_body, function (err, data){
        if(err) throw res.status(500).send(err.messsage)
        res.status(200).send(data)
    });
}
function deleteInterface(req, res){
   
}

module.exports = {
    createInterface,
    getInterfaces,
    getInterface,
    updateInterface, 
    deleteInterface,
    borrarporformularioInterface,
};
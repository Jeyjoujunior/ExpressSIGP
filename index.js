'use strict' //meter instruccioones nuevos estandares de js

var mongoose = require('mongoose');
var app = require('./app.js')
var port = process.env.PORT || 3977;

// Lo primero que hara el servidor es conectarse a la base de datos
//mongoose.connect('mongodb://admin:admin1@ds247121.mlab.com:47121/sigproyect', (err, res) => {
mongoose.connect('mongodb://localhost:27017/test', (err, res) => {
 
    if(err){
        throw err;
    }else{
        console.log("base de datos lanzada con exito");
        app.listen(port, function(){
            console.log("servidor del api rest corriendo.")
        })
    }
})

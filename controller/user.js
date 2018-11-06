'use strict'

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function insertImage(req, res){
    /** 
     * Asigna una imagen ya subida a un user
     * req: request 
     * res: response
     * return: 200 si encuentra y actualiza el usuario
    */
    var imagePath = req.files.image.path;
    var userId = req.params.id;
    User.findOneAndUpdate({_id:userId}, {image:imagePath}, function (err, user){
        res.status(200).send(imagePath);
    });
}

function login(req, res){
    /** 
     * realiza el login a partir de un email y una contrasena
     * req: request 
     * res: response
     * return: - 200 si la contrasena y el email coinciden en la bd
     *         - 400 si la contraseña no coindice
    */
    var email = req.body.email;
    var password = req.body.password;
    console.log(email + "mail del controlador en API")
    console.log(password + "password del controlador en API")
    // Primero buscamos si el usuario existe, si es asi procedemos a comparar las contrasenas con bcrypt
    User.findOne({email}, function(err, user){
        if(!user){
            console.log("Usuario no encontrado")
            res.status(400).send("usuario no existe")
        }else{
       
        bcrypt.compare(password, user.password, function(err, check){
            if (check){
                // Si todo coincide, creamos el token y lo enviamos
                res.status(200).send({token:jwt.createToken(user)}); //A angular tienes que enviarlo como un objeto, sino no lo leerá. 
            }else{
                res.status(400).send()
            }
        });}
    });

}

function createUser(req, res){
        /** 
     * crear un usuario encriptando la contrasena
     * req: request 
     * res: response
     * return: - 200 si se rea el usuario correctamente
     *         - 500 si hay algun problema enviamos un 500 con el mensaje del error
    */
    var user = new User();
   // user.name = req.body.name;
    //user.surname = req.body.surname;
    user.email = req.body.email;
    //user.rol = req.body.rol;
    bcrypt.hash(req.body.password, null, null, function(err, hash){
        user.password = hash;
        user.save(function (err, user){
                if(err){
                res.status(500).send();
                }
                res.status(200).send()
            });
    });
}

function getUsers(req, res){
    /** 
     * Conseguir todos los usarios
     * req: request 
     * res: response
     * return: - 200 lista de usuarios[]
     *       
    */
    User.find({}, function(err, users){
        res.status(200).send(users)
    });
}

// exportamos todos los metodos que necesitemos en el router
module.exports = {
    getUsers,
    createUser,
    login,
    insertImage,
};
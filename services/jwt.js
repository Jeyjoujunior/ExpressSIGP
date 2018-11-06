'use strict'

var jwt = require('jwt-simple'); // modulo que nos permitira crear y leer tokens
var moment = require('moment'); // moment es una libreria que nos permite tratar fechas de una manera mas amigable
var secret = 'clave_secreta_curso'; // string que usamos para encriptar el token, necesitaremos la misma para desencriptar el token

// creamos un token jwt
exports.createToken = function(user){
    //Usamos el objeto payload con todos los datos que necesitemos cuando validemos este token
    //Por ejemplo necesitaremos los datos de usuario
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.role,
        image: user.image,
        iat: moment().unix(), // Timestamp de la cracion del token
        exp: moment().add(30, 'days').unix(), // Fecha de expiracion
    };
    return jwt.encode(payload, secret)
};
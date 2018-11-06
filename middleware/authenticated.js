'use strict'

var jwt = require('jwt-simple')
var moment = require('moment')
// Clave para ocnseguir el payload del token
var secret = 'clave_secreta_curso'

exports.ensureAuth = function(req, res, next){
    /**
     * Usamos 3 validaciones con el token para saber si el token NO es correcto, si todo esta bien
     */
    // Comprobamos que el token esta en headers
    if(!req.headers.authorization){
        return res.status(403).send({message:'la peticion no tiene la cabecera de autenticacion'})
    }
    // Obtenemos la informacion del token y comprobamos que no ha expirado
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try{
        var payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix()){
            return res.status(400).send({mesage: 'el token ha expirado'})
        }
    }catch(ex){
        // Si algo falla cuando obtenemos la inforamcion del token, decimos que el token no es valido.
        console.log(ex);
        return res.status(404).send({message: 'token no valido'})
    }
    //anadimos el user que hemos obtenido en el token a request, este user lo podremos usar en el controlador
    req.user = payload;
    // Invocamos next para pasar al siguiente metodo, en este caso el controller, en este punto se da por hecho que el token es correcto
    next();
};

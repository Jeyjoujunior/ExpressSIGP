'use stricts'

var express = require('express');
var UserController = require('../controller/user'); //Controlador con la logica para asociarla a un end-point
var md_auth = require('../middleware/authenticated') // Importamos el middleware para autentificar un end-point
var api = express.Router() // Instanciamos el enrutamiento de express

// usamos multipart para subir files a partir de un middleware
var multiparty = require('connect-multiparty') // importamos el modulo multiparty
var md_upload = multiparty({uploadDir: './uploads/users'}) 
/*
encoding - sets encoding for the incoming form fields. Defaults to utf8.
maxFieldsSize - Limits the amount of memory all fields (not files) can allocate in bytes. If this value is exceeded, an error event is emitted. The default size is 2MB.
maxFields - Limits the number of fields that will be parsed before emitting an error event. A file counts as a field in this case. Defaults to 1000.
maxFilesSize - Only relevant when autoFiles is true. Limits the total bytes accepted for all files combined. If this value is exceeded, an error event is emitted. The default is Infinity.
autoFields - Enables field events and disables part events for fields. This is automatically set to true if you add a field listener.
autoFiles - Enables file events and disables part events for files. This is automatically set to true if you add a file listener.
uploadDir - Only relevant when autoFiles is true. The directory for placing file uploads in. You can move them later using fs.rename(). Defaults to os.tmpdir().
*/

// definimos las rutas
api.get('/user', UserController.getUsers);
api.post('/user', UserController.createUser);
api.post('/user/login', UserController.login)
api.post('/user/insert-image/:id', md_upload, UserController.insertImage)


module.exports = api;
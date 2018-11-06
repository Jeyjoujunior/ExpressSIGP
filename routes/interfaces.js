'use stricts'

var express = require('express');
var InterfacesController = require('../controller/interfaces'); //Controlador con la logica para asociarla a un end-point
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
api.post('/interfaces', InterfacesController.createInterface);
console.log(md_auth)
api.get('/interfaces',[md_auth.ensureAuth], InterfacesController.getInterfaces); // en esta url necesitamos mandar el token en los headers
api.get('/interfaces/:id', InterfacesController.getInterface);
//api.post('/interfaces/insert-image/:id',[md_upload], InterfacesController.insertImage); // Antes de entrar en el controlador subira la imagen
api.put('/interfaces/:id', InterfacesController.updateInterface) //Ojo porque añadiste una / extra, inicialmente no existía la primera /.
api.delete('interfaces/:id', InterfacesController.deleteInterface)


module.exports = api;
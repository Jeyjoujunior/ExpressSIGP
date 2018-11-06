'use strict'

var express = require('express')
var bodyparser = require('body-parser')
var swaggerJSDoc = require('swagger-jsdoc');
var cors = require('cors'); //Sirve para poder conectar el ANGULAR con la API-CRUD mediante llamadas http. 

var app = express()

// cargar rutas
var user_routes = require('./routes/user')
var requirements_routes = require('./routes/requirements')
var interfaces_routes = require('./routes/interfaces')
var documents_routes = require('./routes/documents')

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json())

// configurar cabeceras


//creamos la aplicación que usa cors para conectarse, siempre antes que las RUTAS!!!!
app.use(cors({origin: 'http://localhost:4200'}));

// rutas base
app.use('/api/user', user_routes)
app.use('/api/requirements', requirements_routes)
app.use('/api/interfaces', interfaces_routes)
app.use('/api/documents', documents_routes)

// Usamos swagger para documentar el API y le enviamos el contenido de la documentacion en swagger.json
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

// Definimos un end point para la documentacion del API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;

const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// Crear el servidor/aplicación express
const app = express();

// Base de datos
dbConnection();

// Directorio público
app.use( express.static('public') );

// CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth'));

// Manejar las demás rutas
app.get( '*', ( req, resp ) => {
    resp.sendFile( path.resolve(  __dirname, 'public/index.html' ) );

} );

// Escucha en el puerto
app.listen(process.env.PORT, ( ) => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});
const express = require('express');
require('dotenv').config();
const  cors  = require('cors');

const { dbConection } = require('./database/config');

//Crear el servidor de express
const app = express();



// Conección  a la base de datos
dbConection();


//Cors
app.use(cors());


//Directorio publico
// se ejecuta un middleware aplicando el metodo de ( use )
//este ejecuta el archivo index ubicado en la acarpeta public
app.use( express.static('public') );


//Lectura y parseo del body ahoara se utiliza esta libreria de expres para recibir el bosy
// y no usar librerias de teceros
app.use( express.json() );


//Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/event', require('./routes/events'))

app.listen( process.env.PORT, () =>{
    console.log(`servidor en puerto ${process.env.PORT}`);
});   
/*// app.js
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/db'); //Conecta a la base de datos
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Llamamos a la función para conectar
db.connectToDatabase();

// Manejar el evento SIGINT para cerrar la conexión a la base de datos antes de apagar la aplicación
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('Conexión a la base de datos cerrada. Aplicación apagada.');
        process.exit(0);
    } catch (error) {
        console.error('Error al cerrar la conexión a la base de datos:', error.message);
        process.exit(1);
    }
});


app.use('/resources', express.static(__dirname + '/public'));


const impresorasRouter = require('./routes/impresoras');
app.use('/', impresorasRouter);



app.listen(3000, () => {
    console.log('Server Up! en http://localhost:3000');
});
*/
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/db'); // Conecta a la base de datos
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Llamamos a la función para conectar
db.connectToDatabase();

// Manejar el evento SIGINT para cerrar la conexión a la base de datos antes de apagar la aplicación
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('Conexión a la base de datos cerrada. Aplicación apagada.');
        process.exit(0);
    } catch (error) {
        console.error('Error al cerrar la conexión a la base de datos:', error.message);
        process.exit(1);
    }
});

app.use('/resources', express.static(__dirname + '/public'));

const impresorasRouter = require('./routes/impresoras');
app.use('/', impresorasRouter);

const PORT = 3000;
const HOST = '0.0.0.0'; // Escucha en todas las interfaces de red

app.listen(PORT, HOST, () => {
    console.log(`Server Up! en http://${HOST}:${PORT}`);
});

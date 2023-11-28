const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/db');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta para archivos estáticos
app.use('/resources', express.static(__dirname + '/public'));

const impresorasRouter = require('./routes/impresoras');
app.use('/', impresorasRouter);


app.listen(3000, () => {
    console.log('Server Up! en http://localhost:3000');
});

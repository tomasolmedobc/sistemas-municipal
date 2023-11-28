const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
    // URL de conexión a MongoDB
    const mongoURI = 'mongodb://127.0.0.1/sistemas_db';

    // Conexión a la base de datos
    await mongoose.connect(mongoURI);

    console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    }
}

// Llamamos a la función para conectar
connectToDatabase();

const express = require('express');
const router = express.Router();
const Impresora = require('../model/Impresora');
const impresoraController = require('../controllers/impresoraController');
const telefonoController = require('../controllers/telefonoController');

// Obtiene las impresoras y las muestra
router.get('/index', async (req, res) => {
    try {
        const impresoras = await Impresora.find({}).exec();
        res.render('index', { impresoras });
    } catch (error) {
        console.error('Error mostrando las impresoras en /index:', error.message);
        res.status(500).json({
            message: 'Error mostrando las impresoras en /index',
            error: error.message,
        });
    }
});

// muestra las impresoras
router.get('/', impresoraController.mostrar);

// Ruta para mostrar planos
router.get('/planos', (req, res) => {
    res.render('planos');
});


// Ruta para agregar una nueva impresora
router.post('/createImpresora', impresoraController.create);

// Ruta para editar una impresora
router.post('/editImpresora', impresoraController.edit);

// Ruta para eliminar una impresora (GET)
router.get('/deleteImpresora/:id', impresoraController.delete);

// Muestra lista de teléfonos
router.get('/internostel', telefonoController.mostrar);

// Ruta para agregar un nuevo Teléfono
router.post('/createTelefono', telefonoController.create);

// Ruta para editar un Teléfono
router.post('/editTelefono', telefonoController.edit);

// Ruta para eliminar un Teléfono (GET)
router.get('/deleteTelefono/:id', telefonoController.delete);


module.exports = router;

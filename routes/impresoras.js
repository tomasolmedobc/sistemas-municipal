const express = require('express');
const router = express.Router();
const Impresora = require('../model/Impresora');
const impresoraController = require('../controllers/impresoraController');



//Obtiene las impresora y las muestra
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
//muestra las impresoras
router.get('/', impresoraController.mostrar);
//Ruta para mostrar planos
router.get('/planos', (req, res) => {
    res.render('planos');
});
//Crear impresoras
router.post('/create', impresoraController.create);
//Editar impresoras
router.post('/edit', impresoraController.edit);
//eliminar impresora(GET)
router.get('/delete/:id', impresoraController.delete)

module.exports = router;

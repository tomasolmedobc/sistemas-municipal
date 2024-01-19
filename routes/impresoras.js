const express = require('express');
const router = express.Router();
const Impresora = require('../model/Impresora');
const impresoraController = require('../controllers/impresoraController');
const telefonoController = require('../controllers/telefonoController');
const domainipController = require('../controllers/domainipController');
const comprobanteController = require('../controllers/comprobanteController');
const pdfController = require('../controllers/pdfController');




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

// Muestra lista de ips

//Visualizar pagina domainp
router.get('/domainip', domainipController.mostrar);
// Ruta para agregar un nuevo ip
router.post('/createDomainip', domainipController.create);

// Ruta para editar un ip
router.post('/editDomainip', domainipController.edit);

// Ruta para eliminar un ip (GET)
router.get('/deleteDomainip/:id', domainipController.delete);


// Muestra lista de comprobantes
//Visualizar pagina comprobantes
router.get('/comprobante', comprobanteController.mostrar);

// Ruta para agregar un nuevo comprobante
router.post('/createComprobante', comprobanteController.create);
//Ruta para editar un comprobante
router.post('/editComprobante', comprobanteController.edit);

// Ruta para eliminar un ip (GET)
router.get('/deleteComprobante/:id', comprobanteController.delete);

router.get('/pdfComprobante/:id', pdfController.print);


module.exports = router;

const Comprobante = require('../model/Comprobante');
const moment = require('moment-timezone');
const generatePDF = require('../public/js/pdfGenerator');



// Mostrar lista de comprobantes
module.exports.mostrar = async (req, res) => {
    try {
        const comprobantes = await Comprobante.find({}).sort({ fecha: -1 }).exec();
        const comprobantesFormateados = comprobantes.map(comprobante => {
            return {
                ...comprobante._doc,
                fecha: comprobante.fecha.toISOString().split('T')[0],
            };
        });
        return res.render('comprobante', { comprobantes: comprobantesFormateados });
    } catch (error) {
        console.error('Error mostrando los comprobantes:', error.message);
        res.status(500).json({
            message: 'Error mostrando los comprobantes',
            error: error.message,
        });
    }
};


// Ruta para agregar un nuevo comprobante
module.exports.create = async (req, res) => {
    try {
        const { receptor_, area_entrega, emisor_, observacion, fecha } = req.body;
        const formattedFechaISO = moment(`${fecha}T00:00:00.000Z`).tz('America/New_York').toISOString();
        const nuevoComprobante = new Comprobante({
            receptor_,
            area_entrega,
            emisor_,
            observacion,
            fecha: formattedFechaISO,
        });

        await nuevoComprobante.save();
        console.log('Comprobante creado:', nuevoComprobante);

        // Redirige a la página de comprobantes y refresca la lista
        res.redirect('/comprobante');
    } catch (error) {
        console.error('Error al crear el comprobante:', error.message);
        res.status(500).json({
            message: 'Error al crear el comprobante',
            error: error.message,
        });
    }
};


// Editar
module.exports.edit = async (req, res) => {
    try {
        const { id_edit, receptor_edit, area_entrega_edit, emisor_edit, observacion_edit, fecha_edit } = req.body;

        if (!id_edit) {
            return res.status(400).json({ message: 'ID de edición no proporcionado' });
        }

        console.log('Fecha recibida desde el formulario:', fecha_edit);

        const fechaMomentEdit = moment(`${fecha_edit}T00:00:00.000Z`).tz('America/New_York');
        const formattedFechaISOEdit = fechaMomentEdit.toISOString();

        await Comprobante.findByIdAndUpdate(id_edit, {
            receptor_: receptor_edit,
            area_entrega: area_entrega_edit,
            emisor_: emisor_edit,
            observacion: observacion_edit,
            fecha: formattedFechaISOEdit,
        });

        res.redirect('/comprobante');
    } catch (error) {
        console.error('Error al actualizar comprobante:', error.message);
        res.status(500).json({
            message: `Error al actualizar comprobante: ${error.message}`,
            error: error.message,
        });
    }
};

// Eliminar
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    console.log('ID a eliminar:', id);

    try {
        const comprobante = await Comprobante.findByIdAndDelete(id);
        if (!comprobante) {
            return res.status(404).json({ message: 'Comprobante no encontrado para eliminar' });
        }
        res.redirect('/comprobante');
    } catch (error) {
        console.error('Error al borrar el Comprobante:', error);
        res.status(500).json({ message: 'Error al borrar el Comprobante' });
    }
};

module.exports.print = async (req, res) => {
    const comprobanteId = req.params.id;
    try {
        const comprobante = await Comprobante.findById(comprobanteId);
        if (!comprobante) {
            return res.status(404).json({ message: 'Comprobante no encontrado para imprimir' });
        }

        // Crear el PDF en memoria
        const doc = generatePDF(comprobante);

        // Enviar el PDF al navegador como un flujo de datos
        res.setHeader('Content-Type', 'application/pdf');
        doc.pipe(res);
        doc.end();
    } catch (error) {
        console.error('Error al imprimir el Comprobante:', error);
        res.status(500).json({ message: 'Error al imprimir el Comprobante' });
    }
};

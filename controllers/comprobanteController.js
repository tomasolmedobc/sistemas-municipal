const { error } = require('jquery');
const Comprobante = require('../model/Comprobante');

//Mostrar lista de comprobantes
module.exports.mostrar = async (req, res) => {
    try {
        const comprobantes = await Comprobante.find({}).exec();
        return res.render('comprobante', { comprobantes: comprobantes });
    } catch (error) {
        console.error('Error mostrando los comprobantes:', error.message);
        res.status(500).json({
            message: 'Error mostrando los comprobantes',
            error: error.message,
        });
    }
};

// Ruta para agregar una nueva comprobante
module.exports.create = async (req, res) => {
    try {
        const { receptor_, area_entrega, emisor_, observacion, fecha } = req.body;

        // Convertir la cadena de fecha a un objeto Date
        const fechaDate = new Date(fecha);

        const nuevoComprobante = new Comprobante({
            receptor_,
            area_entrega,
            emisor_,
            observacion,
            fecha: fechaDate
        });

        await nuevoComprobante.save();

        console.log('Comprobante creado:', nuevoComprobante);
        res.redirect('/comprobante');
    } catch (error) {
        console.error('Error al crear la Comprobante:', error.message);
        res.status(500).json({
            message: 'Error al crear la Comprobante',
            error: error.message,
        });
    }
};

//editar
module.exports.edit = async (req, res) => {
    try {
        const { id_edit, receptor_edit, area_entrega_edit, emisor_edit, observacion_edit, fecha_edit } = req.body;

        if (!id_edit) {
            return res.status(400).json({ message: 'ID de edición no proporcionado' });
        }

        await Comprobante.findByIdAndUpdate(id_edit, { receptor_: receptor_edit, area_entrega: area_entrega_edit, emisor_ : emisor_edit, observacion: observacion_edit, fecha : fecha_edit });
        res.redirect('/comprobante');
    } catch (error) {
        console.error('Error al actualizar comprobante:', error.message);
        res.status(500).json({
            message: `Error al actualizar comprobante: ${error.message}`,
            error: error.message
        });
    }
};

// eliminar
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    console.log('ID a eliminar:', id); // Agrega esta línea para verificar el ID en la consola

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


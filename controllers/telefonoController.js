const { error } = require('jquery');
const Telefono = require('../model/Telefono');

// mostrar lista
module.exports.mostrar = async (req, res) => {
    try {
        const telefonos = await Telefono.find({}).exec();
        return res.render('internostel', { telefonos: telefonos });
    } catch (error) {
        console.error('Error mostrando los teléfonos:', error.message);
        res.status(500).json({
            message: 'Error mostrando los teléfonos',
            error: error.message,
        });
    }
};

// Ruta para agregar una nueva Telefono
module.exports.create = async (req, res) => {
    try {
        // Obtén los datos del formulario
        const { n_interno, oficina, referente } = req.body;

        // Crea una nueva instancia de la Telefono
        const nuevoTelefono = new Telefono({
            n_interno,
            oficina,
            referente
        });

        // Guarda la Telefono en la base de datos
        await nuevoTelefono.save();

        console.log('Telefono creado:', nuevoTelefono);

        // Redirige a la página principal después de crear la Telefono
        res.redirect('/internostel'); 

    } catch (error) {
        console.error('Error al crear la Telefono:', error.message);
        res.status(500).json({
            message: 'Error al crear la Telefono',
            error: error.message,
        });
    }
};


// editar
module.exports.edit = async (req, res) => {
    try {
        const id = req.body.id_edit;
        const n_interno = req.body.n_interno_edit;
        const oficina = req.body.oficina_edit;
        const referente = req.body.referente_edit;

        console.log('ID a actualizar:', id);
        console.log('Datos a actualizar:', { n_interno, oficina, referente });

        await Telefono.findByIdAndUpdate(id, { n_interno, oficina, referente });
        res.redirect('internostel');
    } catch (error) {
        console.error('Error al actualizar teléfono:', error.message);
        res.status(500).json({
            message: `Error al actualizar teléfono: ${error.message}`,
            error: error.message
        });
    }
};

// eliminar
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const telefono = await Telefono.findByIdAndDelete(id);
        if (!telefono) {
            return res.status(404).json({ message: 'Teléfono no encontrado' });
        }
        res.redirect('internostel');
    } catch (error) {
        console.error('Error al borrar el teléfono:', error);
        res.status(500).json({ message: 'Error al borrar el teléfono' });
    }
};

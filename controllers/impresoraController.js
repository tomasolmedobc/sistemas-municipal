const { error } = require('jquery');
const Impresora = require('../model/Impresora');

//mostrar lista
module.exports.mostrar = async (req, res) => {
    try {
        const impresoras = await Impresora.find({}).exec();
        return res.render('index', { impresoras: impresoras }); // Asegúrate de pasar impresoras al renderizar
    } catch (error) {
        console.error('Error mostrando las impresoras:', error.message);
        res.status(500).json({
            message: 'Error mostrando las impresoras',
            error: error.message,
        });
    }
};

// Ruta para agregar una nueva impresora
module.exports.create = async (req, res) => {
    try {
        // Obtén los datos del formulario
        const { establecimiento, nombre_area, impresora_numero, impresora_modelo, toner_descripcion } = req.body;

        // Crea una nueva instancia de la impresora
        const nuevaImpresora = new Impresora({
            establecimiento,
            nombre_area,
            impresora_numero,
            impresora_modelo,
            toner_descripcion,
        });

        // Guarda la impresora en la base de datos
        await nuevaImpresora.save();

        console.log('Impresora creada:', nuevaImpresora);

        // Redirige a la página principal después de crear la impresora
        res.redirect('/'); // Puedes ajustar la ruta a la que quieres redirigir

    } catch (error) {
        console.error('Error al crear la impresora:', error.message);
        res.status(500).json({
            message: 'Error al crear la impresora',
            error: error.message,
        });
    }
};

//editar
module.exports.edit = async (req, res) => {
    try {
        console.log('Datos recibidos en la solicitud:', req.body);
        const id = req.body.id_edit;
        const establecimiento = req.body.establecimiento_edit;
        const nombre_area = req.body.nombre_area_edit;
        const impresora_numero = req.body.impresora_numero_edit;
        const impresora_modelo = req.body.impresora_modelo_edit;
        const toner_descripcion = req.body.toner_descripcion_edit;

        console.log('ID a actualizar:', id);
        console.log('Datos a actualizar:', { establecimiento, nombre_area, impresora_numero, impresora_modelo, toner_descripcion });

        await Impresora.findByIdAndUpdate(id, { establecimiento, nombre_area, impresora_numero, impresora_modelo, toner_descripcion });
        res.redirect('/');
    } catch (error) {
        console.error('Error al actualizar impresora:', error.message);
        res.status(500).json({
            message: `Error al actualizar impresora: ${error.message}`,
            error: error.message
        });
    }
};

//eliminar
module.exports.delete = async (req, res) => {
    const id = req.params.id; // Cambiado de body a params para obtener el ID desde la URL
    try {
        const impresora = await Impresora.findByIdAndDelete(id);
        if (!impresora) {
            return res.status(404).json({ message: 'Impresora no encontrada' });
        }
        res.redirect('/');
    } catch (error) {
        console.error('Error al borrar la impresora:', error);
        res.status(500).json({ message: 'Error al borrar la impresora' });
    }
};

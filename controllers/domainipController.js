const { error } = require('jquery');
const Domainip = require('../model/Domainip');

// mostrar lista
module.exports.mostrar = async (req, res) => {
    try {
        const domainips = await Domainip.find({}).exec();
        return res.render('domainip', { domainips: domainips });
    } catch (error) {
        console.error('Error mostrando los domain ips:', error.message);
        res.status(500).json({
            message: 'Error mostrando los domain ip',
            error: error.message,
        });
    }
};

// Ruta para agregar una nueva Domain ip
module.exports.create = async (req, res) => {
    try {
        const { ip_libres, hostname, nombre_usuario, observacion } = req.body;

        const nuevoDomainip = new Domainip({
            ip_libres,
            hostname,
            nombre_usuario,
            observacion
        });

        await nuevoDomainip.save();

        console.log('ip creado:', nuevoDomainip);
        res.redirect('/domainip');
    } catch (error) {
        console.error('Error al crear la Domain ip:', error.message);
        res.status(500).json({
            message: 'Error al crear la Domain ip',
            error: error.message,
        });
    }
};

//editar
module.exports.edit = async (req, res) => {
    try {
        const { id_edit, ip_libres_edit, hostname_edit, nombre_usuario_edit, observacion_edit } = req.body;

        if (!id_edit) {
            return res.status(400).json({ message: 'ID de edición no proporcionado' });
        }

        await Domainip.findByIdAndUpdate(id_edit, { ip_libres: ip_libres_edit, hostname: hostname_edit, nombre_usuario: nombre_usuario_edit, observacion: observacion_edit });
        res.redirect('/domainip');
    } catch (error) {
        console.error('Error al actualizar domain ip:', error.message);
        res.status(500).json({
            message: `Error al actualizar domain ip: ${error.message}`,
            error: error.message
        });
    }
};

// eliminar
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    console.log('ID a eliminar:', id); // Agrega esta línea para verificar el ID en la consola

    try {
        const domainip = await Domainip.findByIdAndDelete(id);
        if (!domainip) {
            return res.status(404).json({ message: 'Domain ip no encontrado para eliminar' });
        }
        res.redirect('/domainip');
    } catch (error) {
        console.error('Error al borrar el domain ip:', error);
        res.status(500).json({ message: 'Error al borrar el domain ip' });
    }
};

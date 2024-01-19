const Comprobante = require('../model/Comprobante');
const pdfGenerator = require('../public/js/pdfGenerator');


module.exports.print = async (req, res) => {
    const comprobanteId = req.params.id;
    try {
        const comprobante = await Comprobante.findById(comprobanteId);
        if (!comprobante) {
            return res.status(404).json({ message: 'Comprobante no encontrado para imprimir' });
        }

        // Generar el PDF
        const doc = pdfGenerator.generatePDF(comprobante);

        // Enviar el PDF al navegador
        res.setHeader('Content-Type', 'application/pdf');
        doc.pipe(res);
        doc.end();
    } catch (error) {
        console.error('Error al imprimir el Comprobante:', error);
        res.status(500).json({ message: 'Error al imprimir el Comprobante' });
    }
};
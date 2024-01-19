const PDFDocument = require('pdfkit');

function generatePDF(comprobante) {
    const doc = new PDFDocument({ size: 'A4' });

    const imagePathHeader = 'public/image/header.png';
    const imagePathFooter = 'public/image/footer.png';

    // Encabezado del PDF
    doc.image(imagePathHeader, {
        fit: [480, 190],  // Ajusta el tamaño de la imagen para el encabezado
        align: 'center',
        valign: 'top'
        
    });

    // Contenido del PDF
    const contenidoX = 50; // Margen izquierdo
    const contenidoY = 40; // Margen superior

    // Centrar verticalmente el contenido
    const contenidoAncho = doc.page.width - 2 * contenidoX;
    const contenidoAlto = doc.page.height - contenidoY * 2;

    // Calcular la posición vertical central
    const contenidoYCentrado = contenidoY + (contenidoAlto - 80) / 2;

    // Contenido del PDF centrado verticalmente
    const datosY = contenidoYCentrado + 30; // Ajustar según la separación deseada
    const contenidoEstilo = { fontSize: 12, fillColor: '#FFFFFF', lineGap: 10 };
    doc.text(`Recibio: ${comprobante.receptor_}`, contenidoX, datosY, { width: contenidoAncho, ...contenidoEstilo });
    doc.text(`Area responsable: ${comprobante.area_entrega}`, contenidoX, datosY + 20, { width: contenidoAncho, ...contenidoEstilo });
    doc.text(`Entregado por: ${comprobante.emisor_}`, contenidoX, datosY + 40, { width: contenidoAncho, ...contenidoEstilo });
    doc.text(`Observacion: ${comprobante.observacion}`, contenidoX, datosY + 60, { width: contenidoAncho, ...contenidoEstilo });
    doc.text(`Fecha: ${comprobante.fecha}`, contenidoX, datosY + 80, { width: contenidoAncho, ...contenidoEstilo });

    // Pie de página del PDF
    doc.image(imagePathFooter, {
        fit: [520, 190],  // Ajusta el tamaño de la imagen para el pie de página
        align: 'center',
        valign: 'bottom'
    });

    return doc;
}

module.exports = { generatePDF };



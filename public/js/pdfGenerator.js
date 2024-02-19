const PDFDocument = require('pdfkit');

function generatePDF(comprobante) {
    const doc = new PDFDocument();

    // Agrega una página
    doc.addPage({
        size: [595.28, 841.89], // Tamaño A4 en puntos (1 punto = 1/72 pulgada)
        margin: 0 // Sin márgenes
    });

    // Agrega el fondo
    doc.image('public/image/pdfBackground.png', {
        fit: [595.28, 841.89] // Ajusta el tamaño de la imagen para que cubra toda la página
    });

    // Formatear la fecha
    const fecha = new Date(comprobante.fecha);
    const dia = fecha.getUTCDate();
    const mes = getNombreMes(fecha.getUTCMonth());
    const año = fecha.getUTCFullYear();
    const fechaFormateada = `${dia} ${mes} ${año}`;

    // Agrega contenido basado en el comprobante proporcionado
    const contenido =   `Recibió: ${comprobante.receptor_}\n` +
                        `Área responsable: ${comprobante.area_entrega}\n` +
                        `Entregado por: ${comprobante.emisor_}\n` +
                        `Observación: ${comprobante.observacion}\n` +
                        `Fecha: ${fechaFormateada}`;

    // Calcula la posición para colocar el contenido encima del fondo
    const contentX = 50; // Ajusta la posición horizontal según sea necesario
    const contentY = 140; // Ajusta la posición vertical según sea necesario

    // Agrega el contenido encima del fondo
    doc.text(contenido, contentX, contentY);

    return doc; // Devuelve el objeto PDFDocument
}

// Función para obtener el nombre del mes
function getNombreMes(mes) {
    const nombresMeses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return nombresMeses[mes];
}

module.exports = generatePDF;

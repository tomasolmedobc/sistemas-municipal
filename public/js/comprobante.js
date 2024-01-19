// Este es el punto de entrada principal
(function () {
    // Función para agregar eventos con delegación de eventos
    const addEvent = (element, event, selector, handler) => {
        element.addEventListener(event, e => {
            const targetElement = e.target.closest(selector);
            if (targetElement) {
                handler(e, targetElement);
            }
        });
    }

    // Evento que se ejecuta cuando el DOM se ha cargado completamente
    document.addEventListener('DOMContentLoaded', function () {
        // Agregar eventos al cargar el documento

        // Evento para el botón de edición
        addEvent(document, 'click', '.btnEdit', (e, button) => {
            try {
                console.log('Elemento clickeado:', e.target);
                console.log('Botón de Edición clickeado:', button);

                // Verificar si el botón de edición y los elementos esperados están presentes
                if (button) {
                    // Obtener los datos de la fila
                    const row = button.closest('tr');
                    console.log('Fila:', row); // Imprimir la fila para depurar

                    // Ajustar la forma de obtener los valores de las celdas
                    if (row) {
                        // Obtener el ID del comprobante
                        const id = row.querySelector('td:first-child').innerText.trim();

                        // Verificar si el ID se obtuvo correctamente
                        if (!id) {
                            console.error('No se pudo obtener el ID del comprobante.');
                            return;
                        }

                        // Resto del código para obtener otros datos de la fila
                        const receptor = row.children[1].textContent.trim();
                        const areaEntrega = row.children[2].textContent.trim();
                        const emisor = row.children[3].textContent.trim();
                        const observacion = row.children[4].textContent.trim();
                        const fecha = row.children[5].textContent.trim();

                        // Asignar los valores a los campos del formulario de edición
                        const idEditElement = document.getElementById('id_edit');
                        const receptorEditElement = document.getElementById('receptor_edit');
                        const areaEntregaEditElement = document.getElementById('area_entrega_edit');
                        const emisorEditElement = document.getElementById('emisor_edit');
                        const observacionEditElement = document.getElementById('observacion_edit');
                        const fechaEditElement = document.getElementById('fecha_edit');

                        // Verificar si los elementos de edición existen antes de asignarles un valor
                        if (idEditElement && receptorEditElement && areaEntregaEditElement && emisorEditElement && observacionEditElement && fechaEditElement) {
                            idEditElement.value = id;
                            receptorEditElement.value = receptor;
                            areaEntregaEditElement.value = areaEntrega;
                            emisorEditElement.value = emisor;
                            observacionEditElement.value = observacion;
                            fechaEditElement.value = fecha;

                            // Actualización para Bootstrap 5
                            var modal = new bootstrap.Modal(document.getElementById('modalComprobante'));
                            modal.show();
                        } else {
                            console.error('Uno o más elementos de edición no fueron encontrados.');
                        }
                    } else {
                        console.error('La fila no está presente.');
                    }
                }
            } catch (error) {
                console.error('Error al obtener datos de la fila:', error.message);
            }
        });

        // Evento para el botón de agregar comprobante
        var btnAgregarComprobante = document.getElementById('btnAgregarComprobante');
        btnAgregarComprobante.addEventListener('click', function () {
            // Actualización para Bootstrap 5
            var modalAgregarComprobante = new bootstrap.Modal(document.getElementById('modalAgregarComprobante'));
            modalAgregarComprobante.show();
        });

        // Inicializar Bootstrap Tooltips
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        // Evento para el botón de impresión
        addEvent(document, 'click', '.btnPrint', async (e, btnPrint) => {
            try {
                const comprobanteId = btnPrint.getAttribute('data-id');
        
                // Obtener datos del comprobante
                const comprobanteData = await obtenerDatosComprobante(comprobanteId);
        
                // Mostrar la vista de impresión
                mostrarVistaImpresion(comprobanteData);
            } catch (error) {
                console.error('Error al imprimir comprobante:', error.message);
            }
        });
        
        // Función para obtener datos del comprobante
        async function obtenerDatosComprobante(comprobanteId) {
            try {
                const response = await fetch(`/api/comprobante/${comprobanteId}`);
                if (!response.ok) {
                    throw new Error(`Error al obtener datos del comprobante: ${response.statusText}`);
                }
        
                const comprobanteData = await response.json();
                return comprobanteData;
            } catch (error) {
                console.error('Error en obtenerDatosComprobante:', error.message);
                throw error;
            }
        }
        
        // Función para mostrar la vista de impresión
        function mostrarVistaImpresion(comprobanteId) {
            // Crea un nuevo documento HTML para la vista de impresión
            const printWindow = window.open('', '_blank');
            const printDocument = printWindow.document;

            printDocument.write('<html lang="en"><head>');
            printDocument.write('<meta charset="UTF-8">');
            printDocument.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
            printDocument.write('<title>Print Comprobante</title>');
            printDocument.write('</head><body>');

            // Incluye los datos del comprobante en el cuerpo del documento
            printDocument.write('<h1>Contenido del comprobante a imprimir</h1>');
            printDocument.write('<pre>' + JSON.stringify(comprobanteId, null, 2) + '</pre>');

            printDocument.write('</body></html>');
            printDocument.close();
        }
    });
})();

function toggleObservacion(comprobanteId) {
    var observacionElement = document.getElementById('observacion_' + comprobanteId);
    var verMasLink = document.getElementById('verMas_' + comprobanteId);

    if (observacionElement.style.whiteSpace === 'nowrap') {
        observacionElement.style.whiteSpace = 'normal';
        verMasLink.innerText = 'Esconder';
    } else {
        observacionElement.style.whiteSpace = 'nowrap';
        verMasLink.innerText = 'Ver Más';
    }
}
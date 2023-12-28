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
        addEvent(document, 'click', '.btnPrint', (e, btnPrint) => {
            try {
                const comprobanteId = btnPrint.getAttribute('data-id');
                const printWindow = window.open('', '_blank');

                // Cargar la vista de impresión en la nueva ventana
                printWindow.document.write(`
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Print Comprobante</title>
                    </head>
                    <body>
                        <h1>Contenido del comprobante a imprimir</h1>
                        <!-- Agrega el contenido del comprobante aquí -->
                        <script>
                            // Agrega cualquier script necesario para personalizar la impresión
                        </script>
                    </body>
                    </html>
                `);

                // Cierra la escritura en el documento para que el script funcione
                printWindow.document.close();
            } catch (error) {
                console.error('Error al imprimir comprobante:', error.message);
            }
        });

    });
})();


(function () {
    const addEvent = (element, event, selector, handler) => {
        element.addEventListener(event, e => {
            const botonEdit = e.target.closest(selector);
            if (botonEdit) {
                handler(e, botonEdit);
            }
        });
    }
document.addEventListener('DOMContentLoaded', function () {
    // Agregar eventos al cargar el documento
    addEvent(document, 'click', '.btnEdit', (e, botonEdit) => {
        try {
            console.log('Element clicked:', e.target);
            console.log('Boton de Edición clickeado:', botonEdit);

            // Verificar si el botón de edición y los elementos esperados están presentes
            if (botonEdit) {
                // Obtener los datos de la fila
                const fila = botonEdit.closest('tr');
                console.log('Fila:', fila); // Imprime la fila para depurar

                // Ajusta la forma de obtener los valores de las celdas
                if (fila) {
                    // Obtener el ID del comprobante
                    const id = fila.querySelector('td:first-child').innerText.trim();

                    // Verificar si el ID se obtuvo correctamente
                    if (!id) {
                        console.error('No se pudo obtener el ID del Domainip.');
                        return;
                    }

                    // Resto del código para obtener otros datos de la fila
                    const receptor_ = fila.children[1].textContent.trim();
                    const area_entrega = fila.children[2].textContent.trim();
                    const emisor_ = fila.children[3].textContent.trim();
                    const observacion = fila.children[4].textContent.trim();
                    const fecha = fila.children[5].textContent.trim();

                    // Asignar los valores a los campos del formulario de edición
                    const idEditElement = document.getElementById('id_edit');
                    const receptorEditElement = document.getElementById('receptor_edit');
                    const areaEntregaEditElement = document.getElementById('area_entrega_edit');
                    const emisorEditElement = document.getElementById('emisor_edit');
                    const observacionEditElement = document.getElementById('observacion_edit');
                    const fechaEditElement = document.getElementById('fecha_edit');

                    // Verificar si el elemento referente_edit existe antes de intentar asignarle un valor
                    if (idEditElement && receptorEditElement && areaEntregaEditElement && emisorEditElement && observacionEditElement && fechaEditElement) {
                        idEditElement.value = id;
                        receptorEditElement.value = receptor_;
                        areaEntregaEditElement.value = area_entrega;
                        emisorEditElement.value = emisor_;
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

    var btnAgregarComprobante = document.getElementById('btnAgregarComprobante');
    btnAgregarComprobante.addEventListener('click', function () {
        // Actualización para Bootstrap 5
        var modalAgregarComprobante = new bootstrap.Modal(document.getElementById('modalAgregarComprobante'));
        modalAgregarComprobante.show();
    });

    // Inicializa Bootstrap Tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    
    });

})();
       ///imprimir comprobante
    function imprimirComprobante() {
        // Obtener el contenido del formulario de edición
        const formulario = document.getElementById('formulario-comprobante');
        const contenidoFormulario = formulario.outerHTML;
    
        // Imprimir el contenido del formulario
        const ventanaImpresion = window.open('', '_blank');
        ventanaImpresion.document.write('<html><head><title>Formulario</title>');
        ventanaImpresion.document.write('<link rel="stylesheet" type="text/css" href="/resources/css/comprobante.css">');
        ventanaImpresion.document.write('</head><body>');
        ventanaImpresion.document.write(contenidoFormulario);
        ventanaImpresion.document.write('</body></html>');
        ventanaImpresion.print();
        ventanaImpresion.close();
    }
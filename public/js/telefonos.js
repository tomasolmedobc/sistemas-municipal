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
                    // Obtener el ID de la telefono
                    const id = fila.querySelector('td:first-child').innerText.trim();

                    // Verificar si el ID se obtuvo correctamente
                    if (!id) {
                        console.error('No se pudo obtener el ID del Telefono.');
                        return;
                    }

                    // Resto del código para obtener otros datos de la fila
                    const n_interno = fila.children[1].textContent.trim();
                    const oficina = fila.children[2].textContent.trim();
                    const referente = fila.children[3].textContent.trim();

                    // Asignar los valores a los campos del formulario de edición
                    const idEditElement = document.getElementById('id_edit');
                    const nInternoEditElement = document.getElementById('n_interno_edit');
                    const oficinaEditElement = document.getElementById('oficina_edit');

                    // Verificar si el elemento referente_edit existe antes de intentar asignarle un valor
                    const referenteEditElement = document.getElementById('referente_edit');
                    if (idEditElement && nInternoEditElement && oficinaEditElement && referenteEditElement) {
                        idEditElement.value = id;
                        nInternoEditElement.value = n_interno;
                        oficinaEditElement.value = oficina;
                        referenteEditElement.value = referente;

                        // Actualización para Bootstrap 5
                        var modal = new bootstrap.Modal(document.getElementById('modalTelefono'));
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

    var btnAgregarTelefono = document.getElementById('btnAgregarTelefono');
    btnAgregarTelefono.addEventListener('click', function () {
        // Actualización para Bootstrap 5
        var modalAgregarTelefono = new bootstrap.Modal(document.getElementById('modalAgregarTelefono'));
        modalAgregarTelefono.show();
    });

    // Inicializa Bootstrap Tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

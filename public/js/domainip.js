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
                    // Obtener el ID del domainip
                    const id = fila.querySelector('td:first-child').innerText.trim();

                    // Verificar si el ID se obtuvo correctamente
                    if (!id) {
                        console.error('No se pudo obtener el ID del Domainip.');
                        return;
                    }

                    // Resto del código para obtener otros datos de la fila
                    const ip_libres = fila.children[1].textContent.trim();
                    const hostname = fila.children[2].textContent.trim();
                    const nombre_usuario = fila.children[3].textContent.trim();
                    const observacion = fila.children[4].textContent.trim();

                    // Asignar los valores a los campos del formulario de edición
                    const idEditElement = document.getElementById('id_edit');
                    const ipLibresEditElement = document.getElementById('ip_libres_edit');
                    const hostnameEditElement = document.getElementById('hostname_edit');
                    const nombreUsuarioEditElement = document.getElementById('nombre_usuario_edit');
                    const observacionEditElement = document.getElementById('observacion_edit');

                    // Verificar si el elemento referente_edit existe antes de intentar asignarle un valor
                    if (idEditElement && ipLibresEditElement && hostnameEditElement && nombreUsuarioEditElement && observacionEditElement) {
                        idEditElement.value = id;
                        ipLibresEditElement.value = ip_libres;
                        hostnameEditElement.value = hostname;
                        nombreUsuarioEditElement.value = nombre_usuario;
                        observacionEditElement.value = observacion;

                        // Actualización para Bootstrap 5
                        var modal = new bootstrap.Modal(document.getElementById('modalDomainip'));
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

    var btnAgregarDomainip = document.getElementById('btnAgregarDomainip');
    btnAgregarDomainip.addEventListener('click', function () {
        // Actualización para Bootstrap 5
        var modalAgregarDomainip = new bootstrap.Modal(document.getElementById('modalAgregarDominioip'));
        modalAgregarDomainip.show();
    });

    // Inicializa Bootstrap Tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
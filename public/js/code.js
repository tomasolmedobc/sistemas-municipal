const addEvent = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        const botonEdit = e.target.closest(selector);
        if (botonEdit) {
            handler(e, botonEdit);
        }
    });
}

addEvent(document, 'click', '.btnEdit', (e, botonEdit) => {
    try {
        console.log('Element clicked:', e.target);
        console.log('Boton de Edición clickeado:', botonEdit);

        // Verificar si el botón de edición y los elementos esperados están presentes
        if (botonEdit) {
            // Obtener los datos de la fila
            const fila = botonEdit.closest('tr');
            if (fila && fila.children && fila.children.length >= 6) {
                // Obtener el ID de la impresora
                const id = fila.querySelector('td:first-child').innerText.trim();

                // Verificar si el ID se obtuvo correctamente
                if (!id) {
                    console.error('No se pudo obtener el ID de la impresora.');
                    return;
                }

                // Resto del código para obtener otros datos de la fila
                const establecimiento = fila.children[1].innerHTML.trim();
                const nombre_area = fila.children[2].innerHTML.trim();
                const impresora_numero = fila.children[3].innerHTML.trim();
                const impresora_modelo = fila.children[4].innerHTML.trim();
                const toner_descripcion = fila.children[5].innerHTML.trim();

                // Asignar los valores a los campos del formulario de edición
                document.getElementById('id_edit').value = id;
                document.getElementById('establecimiento_edit').value = establecimiento;
                document.getElementById('nombre_area_edit').value = nombre_area;
                document.getElementById('impresora_numero_edit').value = impresora_numero;
                document.getElementById('impresora_modelo_edit').value = impresora_modelo;
                document.getElementById('toner_descripcion_edit').value = toner_descripcion;

                // Actualización para Bootstrap 5
                var modal = new bootstrap.Modal(document.getElementById('modalImpresora'));
                modal.show();
            } else {
                console.error('La fila o los elementos esperados no están presentes.');
            }
        }
    } catch (error) {
        console.error('Error al obtener datos de la fila:', error.message);
    }
});

// Resto del código...

document.addEventListener('DOMContentLoaded', function () {
    var btnAgregarImpresora = document.getElementById('btnAgregarImpresora');
    btnAgregarImpresora.addEventListener('click', function () {
        // Actualización para Bootstrap 5
        var modalAgregarImpresora = new bootstrap.Modal(document.getElementById('modalAgregarImpresora'));
        modalAgregarImpresora.show();
    });

    // Inicializa Bootstrap Tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

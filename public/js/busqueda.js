document.getElementById('busqueda').addEventListener('input', function () {
    // Obtener el valor de búsqueda ingresado
    const searchTerm = this.value.toLowerCase();
    
    // Filtrar la tabla de datos según el término de búsqueda
    const rows = document.querySelectorAll('[data-table="table"] tbody tr');
    rows.forEach(function (row) {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

function filtrarPorEstablecimiento() {
    var idEstablecimiento = document.getElementById('filtro').value;
    // Realizar una solicitud AJAX al servidor para obtener los elementos del establecimiento
    $.ajax({
        type: 'POST', // O el método que estés utilizando
        url: 'obtener_elementos.php', // Reemplaza con la ruta correcta de tu servidor
        data: { idEstablecimiento: idEstablecimiento },
        success: function(data) {
            // Actualizar la lista de elementos en la página
            $('#lista-elementos').html(data);
        }
    });
}

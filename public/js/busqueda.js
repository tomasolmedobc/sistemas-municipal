    document.getElementById('filtro').addEventListener('change', function () {
        filtrarTabla();
    });
    
    document.getElementById('busqueda').addEventListener('input', function () {
        filtrarTabla();
    });
    
    function filtrarTabla() {
        // Obtener el valor del filtro seleccionado
        const filtroSeleccionado = document.getElementById('filtro').value.toLowerCase();
    
        // Obtener el valor de búsqueda ingresado
        const searchTerm = document.getElementById('busqueda').value.toLowerCase();
    
        // Filtrar la tabla de datos según el término de búsqueda y el filtro seleccionado
        const rows = document.querySelectorAll('[data-table="table"] tbody tr');
        rows.forEach(function (row) {
        const text = row.textContent.toLowerCase();
    
        // Comprobar si el texto contiene el término de búsqueda y pertenece al filtro seleccionado
        if (text.includes(searchTerm) && (filtroSeleccionado === 'todos' || text.includes(filtroSeleccionado))) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
        });
    }
    
  
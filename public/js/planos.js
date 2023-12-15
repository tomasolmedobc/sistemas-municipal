// En busqueda.js (o en un archivo donde sea accesible)
function abrirLightbox(imagePath) {
    // Obtener el elemento del lightbox y la imagen
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');

    // Asignar la imagen al elemento del lightbox
    lightboxImg.src = imagePath;

    // Mostrar el lightbox
    lightbox.style.display = 'block';
}

function cerrarLightbox() {
    // Ocultar el lightbox
    var lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

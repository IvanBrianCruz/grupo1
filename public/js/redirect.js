document.addEventListener('DOMContentLoaded', function() {
    // Verificar si ya se ha visitado la página
    const visited = localStorage.getItem('visited');

    if (!visited) {
        // Si es la primera vez, redireccionar a un enlace específico
        window.location.href = 'http://localhost:3060/bibloteca'; // Reemplaza con tu enlace deseado

        // Marcar la página como visitada para futuras visitas
        localStorage.setItem('visited', 'true');
    }
});

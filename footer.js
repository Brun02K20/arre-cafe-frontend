//footer
let mainFooter = document.querySelector(".nav-footer"),
contactFooter = document.querySelector(".contact-footer");

function eliminarElementosEnResponsive(mediaQuery) {
    if (mediaQuery.matches) {
        // Agregar la clase "none" si el ancho de la ventana es igual o menor a 768px
        mainFooter.classList.add("none");
        contactFooter.classList.add("none");
    } else {
        // Quitar la clase "none" si el ancho de la ventana es mayor a 768px
        mainFooter.classList.remove("none");
        contactFooter.classList.remove("none");
    }
}
// Crear una instancia de MediaQueryList con la consulta para 768px o menos
let mediaQuery = window.matchMedia("(max-width: 768px)");

// Llamar a la función para verificar el estado inicial
eliminarElementosEnResponsive(mediaQuery);

// Agregar un listener para verificar si cambia el estado de la ventana
mediaQuery.addListener(eliminarElementosEnResponsive);
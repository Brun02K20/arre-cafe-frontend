let mainFooter = document.querySelector(".nav-footer"),
    contactFooter = document.querySelector(".contact-footer"),
    emailContact = document.querySelector(".contact-footer p:first-child"),
    phoneContact = document.querySelector(".contact-footer p:nth-child(2)"),
    addressContact = document.querySelector(".contact-footer p:last-child"),
    emailIcon = document.querySelector(".iconos-contacto i:first-child"),
    locationIcon = document.querySelector(".iconos-contacto i:last-child");

function eliminarElementosEnResponsive(mediaQuery) {
    if (mediaQuery.matches) {
        // Ocultar el menú "Main" si el ancho de la ventana es igual o menor a 768px
        mainFooter.classList.add("none");

        // Ocultar el email, dirección y sus respectivos íconos
        emailContact.classList.add("none");
        addressContact.classList.add("none");
        emailIcon.classList.add("none");
        locationIcon.classList.add("none");

        // Mostrar solo el número de teléfono y su ícono
        phoneContact.classList.remove("none");
    } else {
        // Mostrar el menú "Main" si el ancho de la ventana es mayor a 768px
        mainFooter.classList.remove("none");

        // Volver a mostrar el email, dirección y sus respectivos íconos
        emailContact.classList.remove("none");
        addressContact.classList.remove("none");
        emailIcon.classList.remove("none");
        locationIcon.classList.remove("none");
    }
}

// Crear una instancia de MediaQueryList con la consulta para 768px o menos
let mediaQuery = window.matchMedia("(max-width: 768px)");

// Llamar a la función para verificar el estado inicial
eliminarElementosEnResponsive(mediaQuery);

// Agregar un listener para verificar si cambia el estado de la ventana
mediaQuery.addListener(eliminarElementosEnResponsive);

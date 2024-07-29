


/* Menu hamburguesa */
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navegacion = document.querySelector('.navegacion');

    menuToggle.addEventListener('click', function() {
        navegacion.classList.toggle('show');
    });
});

// Verificar si el usuario ha iniciado sesión
function checkLoginStatus() {
    if (localStorage.getItem('loggedIn') !== 'true') {
        alert('Debe iniciar sesión para acceder a esta página.');
        window.location.href = 'sesion.html'; // Redirigir a la página de inicio de sesión
    }
}

// Ejecutar la verificación de sesión solo en index-admin.html y menu-admin.html
if (window.location.pathname.endsWith('index-admin.html') || window.location.pathname.endsWith('menu-admin.html') || window.location.pathname.endsWith('index-admin') || window.location.pathname.endsWith('menu-admin')) {
    checkLoginStatus();
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('loggedIn'); // Eliminar el estado de la sesión
}


// SweetAlert

function sweet(icon, title){
    if(icon === "error"){
        Swal.fire({
            icon: icon,
            title: title,
            customClass: {
                popup: 'mi-popup',
                title: 'mi-titulo',
                content: 'mi-contenido',
                confirmButton: 'mi-boton-confirmar'
            }
        });
    }else{  
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Inicio de sesión exitoso",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'mi-popup',
                title: 'mi-titulo',
                content: 'mi-contenido',
                confirmButton: 'mi-boton-confirmar'
            }
        });
    }
}

//Establece la duracion del carrusel
document.addEventListener('DOMContentLoaded', () => {
    // Función para inicializar el carrusel
    const initializeCarousel = () => {
        const carousel = new bootstrap.Carousel(document.querySelector('#carouselExampleFade'), {
            interval: 3000, // Intervalo de 2 segundos
            ride: 'carousel'
        });
    };
    initializeCarousel();
});


//LLAMADA A LA CARTA
async function fetchCarta() {
    try {
        const response = await fetch('https://arre-backend-one.vercel.app/api/arre/productos/carta');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        displayCarta(data);
    } catch (error) {
        console.error('Error fetching the carta:', error);
    }
}

// Función para mostrar la carta del restaurante AL CLIENTE
function displayCarta(data) {
    const cartaDiv = document.getElementById('carta');
    const barraBusquedaDiv = document.getElementById('barra-busqueda');

    // Vaciar los contenedores
    cartaDiv.innerHTML = '';
    barraBusquedaDiv.innerHTML = '';

    // Recorrer las categorías y agregarlas al DOM
    data.forEach(categoria => {
        const categoriaDiv = document.createElement('div');
        categoriaDiv.className = 'category';
        categoriaDiv.innerHTML = `<h2>${categoria.nombre}</h2>`;

        categoria.subcategorias.forEach(subcategoria => {
            const subcategoriaDiv = document.createElement('div');
            subcategoriaDiv.className = 'subcategory';
            subcategoriaDiv.id = `subcategoria-${subcategoria.id}`; // Asegúrate de que el id sea único
            subcategoriaDiv.innerHTML = `<h3>${subcategoria.nombre}</h3>`;

            const productsRowDiv = document.createElement('div');
            productsRowDiv.className = 'products-row';

            subcategoria.Productos.forEach(producto => {
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('product-index');

                const productoImg = document.createElement('img');
                productoImg.src = producto.foto;
                productoImg.alt = producto.nombre;

                const productoInfoDiv = document.createElement('div');
                productoInfoDiv.classList.add('product-info');
                productoInfoDiv.innerHTML = `<div class="titulo-descrip"> <strong>${producto.nombre}</strong> <br> <p>${producto.descripcion}</p> </div>
                                        <div class="divPrecio">$${producto.precio}</div>`;

                productoDiv.appendChild(productoImg);
                productoDiv.appendChild(productoInfoDiv);
                productsRowDiv.appendChild(productoDiv);
            });

            subcategoriaDiv.appendChild(productsRowDiv);
            categoriaDiv.appendChild(subcategoriaDiv);
        });

        cartaDiv.appendChild(categoriaDiv);

        // Crear enlaces para las subcategorías
        categoria.subcategorias.forEach(subcategoria => {
            const subcategoriaLink = document.createElement('div');
            subcategoriaLink.className = 'subcategory-link';
            subcategoriaLink.innerHTML = subcategoria.nombre;
            subcategoriaLink.onclick = () => {
                document.getElementById(`subcategoria-${subcategoria.id}`).scrollIntoView({ behavior: 'smooth' });
            };
            barraBusquedaDiv.appendChild(subcategoriaLink);
        });
    });
}
    
async function fetchCarrusel() {
    try {
        const response = await fetch('https://arre-backend-one.vercel.app/api/arre/productos/carrusel/urls');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        displayCarrusel(data);
    } catch (error) {
        console.error('Error fetching the carrusel:', error);
    }
}

function displayCarrusel(data) {
    const carouselInner = document.getElementById('carousel-inner');
    carouselInner.innerHTML = ''; // Clear existing content

    data.forEach((url, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'carousel-item';
        if (index === 0) {
            itemDiv.classList.add('active');
        }
        const img = document.createElement('img');
        img.src = url;
        img.className = 'd-block w-100';
        itemDiv.appendChild(img);
        carouselInner.appendChild(itemDiv);
    });
}

window.onload = () => {
    fetchCarrusel();
    fetchCarta();
};


// Login
async function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validar campos vacíos
    if (!username || !password) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, ingrese el nombre de usuario y la contraseña.',
            customClass: {
                container: 'my-swal-container'
            }
        });
        return; // Detener la ejecución si hay campos vacíos
    }

    try {
        const response = await fetch('https://arre-backend-one.vercel.app/api/arre/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario: username, password: password })
        });

        const data = await response.json();

        if (response.ok && data.token) {
            // Almacenar el token en localStorage
            localStorage.setItem('authToken', data.token);

            // Mensaje de éxito y redirección
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: 'Redirigiendo...',
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    container: 'my-swal-container'
                }
            }).then(() => {
                localStorage.setItem('loggedIn', 'true'); // Guardar el estado de la sesión
                window.location.href = 'index-admin.html';
            });
        } else {
            // Manejo de errores de autenticación
            sweet("error",data.error || "Nombre de usuario o contraseña incorrectos");
        }
        
    } catch (error) {
        console.error('Error durante el login:', error);
        sweet("error","Nombre de usuario o contraseña incorrectos");
    }
}

/* ACA CAMBIA EL TOKEN EN EL HEADER */
async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('Token not found');
    }

    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
    };

    // Eliminar 'Content-Type' si el body es una instancia de FormData
    if (options.body instanceof FormData) {
        delete options.headers['Content-Type'];
    } else {
        options.headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, options);
    let data;
    try {
        data = await response.json();
    } catch (error) {
        data = null;
    }
    return { data, ok: response.ok };
}

// Función para obtener y rellenar las subcategorías
async function fetchSubcategorias() {
    try {
        const response = await fetch('https://arre-backend-one.vercel.app/api/arre/subcategorias');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        populateSubcategorias(data);
    } catch (error) {
        console.error('Error fetching subcategorias:', error);
    }
}

function populateSubcategorias(subcategorias) {
    const subcategoriaSelect = document.getElementById('subcategoria');
    subcategorias.forEach(subcategoria => {
        const option = document.createElement('option');
        option.value = subcategoria.id;
        option.textContent = subcategoria.nombre;
        subcategoriaSelect.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', fetchSubcategorias);



function sweet(icon, text) {
    Swal.fire({
        icon: icon,
        text: text
    });
}


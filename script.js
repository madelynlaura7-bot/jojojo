
/* =================================================
   PROYECTO: PAGINA WEB PERSONAL
   ASIGNATURA: DISEÑO WEB II
   FUNCIONES: MANIPULACION DEL DOM
================================================= */


/* =================================================
   1. MODO OSCURO Y MODO CLARO
================================================= */

// Seleccionamos los elementos del DOM
const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");
const bodyElement = document.body;

// Funcion para aplicar el tema
function aplicarTema(modoOscuro) {

    if (modoOscuro) {

        bodyElement.classList.add("dark-mode");

        themeIcon.className = "bi bi-sun-fill";
        themeText.textContent = "Modo claro";

        themeBtn.setAttribute(
            "aria-label",
            "Activar modo claro"
        );

    } else {

        bodyElement.classList.remove("dark-mode");

        themeIcon.className = "bi bi-moon-stars-fill";
        themeText.textContent = "Modo oscuro";

        themeBtn.setAttribute(
            "aria-label",
            "Activar modo oscuro"
        );

    }

}

// Recuperamos la preferencia guardada
const temaGuardado = localStorage.getItem("tema");

// Aplicamos el tema inicial
aplicarTema(temaGuardado === "oscuro");

// Escuchamos el evento click
themeBtn.addEventListener("click", () => {

    const estaOscuro =
        bodyElement.classList.contains("dark-mode");

    // Cambiamos el tema
    aplicarTema(!estaOscuro);

    // Guardamos la preferencia
    localStorage.setItem(
        "tema",
        !estaOscuro ? "oscuro" : "claro"
    );

});


/* =================================================
   2. FILTRADO DE JUEGOS CON EL DOM
================================================= */

// Seleccionamos los botones
const botonesFiltro =
    document.querySelectorAll(".filter-btn");

// Seleccionamos las tarjetas
const juegos =
    document.querySelectorAll(".game-item");

// Texto informativo
const resultadoFiltro =
    document.getElementById("resultadoFiltro");

// Recorremos los botones
botonesFiltro.forEach(boton => {

    boton.addEventListener("click", () => {

        // Obtenemos la categoría seleccionada
        const categoria = boton.dataset.filtro;

        // Actualizamos el botón activo
        botonesFiltro.forEach(btn => {
            btn.classList.remove("active");
        });

        boton.classList.add("active");

        // Contador de resultados
        let encontrados = 0;

        // Recorremos las tarjetas
        juegos.forEach(juego => {

            const categoriaJuego =
                juego.querySelector(".game-card").dataset.categoria;

            // Verificamos la categoría
            if (
                categoria === "todos" ||
                categoriaJuego === categoria
            ) {

                juego.classList.remove("hidden");
                encontrados++;

            } else {

                juego.classList.add("hidden");

            }

        });

        // Actualizamos el resultado en pantalla
        resultadoFiltro.textContent =
            encontrados === 0
                ? "No se encontraron juegos."
                : `Se encontraron ${encontrados} juego(s).`;

    });

});


/* =================================================
   3. MENU HAMBURGUESA RESPONSIVE
================================================= */

// Seleccionamos el menú
const menuPrincipal =
    document.getElementById("menuPrincipal");

// Seleccionamos los enlaces
const enlacesMenu =
    document.querySelectorAll(".navbar-nav .nav-link");

// Recorremos los enlaces
enlacesMenu.forEach(enlace => {

    enlace.addEventListener("click", () => {

        // Comprobamos si estamos en pantalla pequeña
        if (
            window.innerWidth < 992 &&
            menuPrincipal.classList.contains("show")
        ) {

            // Cerramos el menú utilizando Bootstrap
            const menuBootstrap =
                bootstrap.Collapse.getOrCreateInstance(
                    menuPrincipal
                );

            menuBootstrap.hide();

        }

    });

});


/* =================================================
   4. VALIDACION DEL FORMULARIO
================================================= */

// Seleccionamos el formulario
const contactForm =
    document.getElementById("contactForm");

// Seleccionamos los campos
const nombreInput =
    document.getElementById("nombre");

const correoInput =
    document.getElementById("correo");

const mensajeInput =
    document.getElementById("mensaje");

// Seleccionamos los mensajes de error
const errorNombre =
    document.getElementById("errorNombre");

const errorCorreo =
    document.getElementById("errorCorreo");

const errorMensaje =
    document.getElementById("errorMensaje");

// Contenedor de alertas
const alertaBox =
    document.getElementById("alertaBox");

// Contador de caracteres
const contador =
    document.getElementById("contador");


/* ==========================================
   4.1 FUNCION PARA MOSTRAR ERRORES
========================================== */

function mostrarError(input, contenedor, mensaje) {

    // Mostramos el mensaje
    contenedor.textContent = mensaje;

    // Agregamos la clase de error
    input.classList.add("invalid");

    // Quitamos la clase de válido
    input.classList.remove("valid");

    // Indicamos el estado al navegador
    input.setAttribute("aria-invalid", "true");

}


/* ==========================================
   4.2 FUNCION PARA MOSTRAR CAMPO CORRECTO
========================================== */

function mostrarCorrecto(input, contenedor) {

    // Limpiamos el error
    contenedor.textContent = "";

    // Quitamos el estilo de error
    input.classList.remove("invalid");

    // Agregamos el estilo correcto
    input.classList.add("valid");

    input.setAttribute("aria-invalid", "false");

}


/* ==========================================
   4.3 VALIDAR NOMBRE
========================================== */

function validarNombre() {

    const nombre = nombreInput.value.trim();

    // Comprobamos que no esté vacío
    if (nombre === "") {

        mostrarError(
            nombreInput,
            errorNombre,
            "Este campo es obligatorio."
        );

        return false;
    }

    // Comprobamos la longitud
    if (nombre.length < 3) {

        mostrarError(
            nombreInput,
            errorNombre,
            "El nombre debe tener al menos 3 caracteres."
        );

        return false;
    }

    // Permitimos letras, tildes, espacios,
    // apóstrofes y guiones.
    const expresionNombre =
        /^[\p{L}]+(?:[ '\u002D][\p{L}]+)*$/u;

    if (!expresionNombre.test(nombre)) {

        mostrarError(
            nombreInput,
            errorNombre,
            "Ingresa un nombre válido, sin números ni símbolos."
        );

        return false;
    }

    mostrarCorrecto(nombreInput, errorNombre);

    return true;

}


/* ==========================================
   4.4 VALIDAR CORREO ELECTRONICO
========================================== */

function validarCorreo() {

    const correo = correoInput.value.trim();

    // Verificamos que no esté vacío
    if (correo === "") {

        mostrarError(
            correoInput,
            errorCorreo,
            "El correo electrónico es obligatorio."
        );

        return false;
    }

    // Expresión regular del correo
    const expresionCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // Comprobamos el formato
    if (!expresionCorreo.test(correo)) {

        mostrarError(
            correoInput,
            errorCorreo,
            "Ingresa un correo válido. Ejemplo: usuario@gmail.com"
        );

        return false;
    }

    mostrarCorrecto(correoInput, errorCorreo);

    return true;

}


/* ==========================================
   4.5 VALIDAR MENSAJE
========================================== */

function validarMensaje() {

    const mensaje = mensajeInput.value.trim();

    // Verificamos que no esté vacío
    if (mensaje === "") {

        mostrarError(
            mensajeInput,
            errorMensaje,
            "Debes escribir un mensaje."
        );

        return false;
    }

    // Comprobamos la longitud mínima
    if (mensaje.length < 10) {

        mostrarError(
            mensajeInput,
            errorMensaje,
            "El mensaje debe tener al menos 10 caracteres."
        );

        return false;
    }

    // Comprobamos la longitud máxima
    if (mensaje.length > 500) {

        mostrarError(
            mensajeInput,
            errorMensaje,
            "El mensaje no puede superar los 500 caracteres."
        );

        return false;
    }

    mostrarCorrecto(mensajeInput, errorMensaje);

    return true;

}


/* ==========================================
   4.6 VALIDACION EN TIEMPO REAL
========================================== */

// Validamos cuando el usuario sale del campo
nombreInput.addEventListener("blur", validarNombre);

correoInput.addEventListener("blur", validarCorreo);

mensajeInput.addEventListener("blur", validarMensaje);


// Actualizamos la validación cuando escribe
nombreInput.addEventListener("input", () => {

    if (nombreInput.classList.contains("invalid")) {
        validarNombre();
    }

});

correoInput.addEventListener("input", () => {

    if (correoInput.classList.contains("invalid")) {
        validarCorreo();
    }

});

mensajeInput.addEventListener("input", () => {

    contador.textContent =
        `${mensajeInput.value.length} / 500`;

    if (mensajeInput.classList.contains("invalid")) {
        validarMensaje();
    }

});


/* ==========================================
   4.7 ENVIAR FORMULARIO
========================================== */

contactForm.addEventListener("submit", (evento) => {

    // Evitamos que se recargue la página
    evento.preventDefault();

    // Validamos todos los campos
    const nombreValido = validarNombre();

    const correoValido = validarCorreo();

    const mensajeValido = validarMensaje();

    // Comprobamos si todos son correctos
    if (
        nombreValido &&
        correoValido &&
        mensajeValido
    ) {

        // Mostramos mensaje de éxito
        alertaBox.className = "form-alert success";

        alertaBox.textContent =
            "¡Excelente! Todos los datos son válidos. Formulario completado correctamente.";

        // Limpiamos el formulario
        contactForm.reset();

        // Limpiamos los estilos de validación
        limpiarValidaciones();

        // Actualizamos el contador
        contador.textContent = "0 / 500";

    } else {

        // Mostramos mensaje general de error
        alertaBox.className = "form-alert error";

        alertaBox.textContent =
            "Por favor, revisa los campos marcados y corrige los errores.";

        // Enfocamos el primer campo incorrecto
        if (!nombreValido) {
            nombreInput.focus();

        } else if (!correoValido) {
            correoInput.focus();

        } else {
            mensajeInput.focus();
        }

    }

});


/* ==========================================
   4.8 LIMPIAR VALIDACIONES
========================================== */

function limpiarValidaciones() {

    const campos = [
        nombreInput,
        correoInput,
        mensajeInput
    ];

    const errores = [
        errorNombre,
        errorCorreo,
        errorMensaje
    ];

    // Limpiamos los estilos de los campos
    campos.forEach(campo => {

        campo.classList.remove("invalid", "valid");

        campo.removeAttribute("aria-invalid");

    });

    // Limpiamos los mensajes
    errores.forEach(error => {

        error.textContent = "";

    });

}


// Evento para limpiar el formulario
contactForm.addEventListener("reset", () => {

    // Se ejecuta después de que el navegador
    // haya restablecido los valores del formulario.
    setTimeout(() => {

        limpiarValidaciones();

        alertaBox.className = "";
        alertaBox.textContent = "";

        contador.textContent = "0 / 500";

    }, 0);

});


/* =================================================
   FIN DEL PROYECTO
================================================= */

console.log("Página personal cargada correctamente.");
console.log("DOM listo para funcionar.");

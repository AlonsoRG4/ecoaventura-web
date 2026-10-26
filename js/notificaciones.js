// =========================================================
// ECOAVENTURA - NOTIFICACIÓN "INSTALAR AHORA"
// Aparece como notificación push cuando el visitante llega
// al final de la página (sección de descarga o pie de página).
// =========================================================

(function () {
    "use strict";

    const aviso = document.getElementById("aviso-instalar");
    if (!aviso) return;

    const cerrar = document.getElementById("aviso-instalar-cerrar");
    const boton = document.getElementById("aviso-instalar-btn");
    const CLAVE = "ecoaventura-aviso-instalar-cerrado";
    let mostrado = false;

    function yaCerrado() {
        try {
            return window.sessionStorage.getItem(CLAVE) === "1";
        } catch (error) {
            return false;
        }
    }

    function recordarCerrado() {
        try {
            window.sessionStorage.setItem(CLAVE, "1");
        } catch (error) {
            /* sin almacenamiento: se vuelve a mostrar al recargar */
        }
    }

    function mostrar() {
        if (mostrado || yaCerrado()) return;
        mostrado = true;
        aviso.hidden = false;
        // Un cuadro después para que la transición de entrada se vea
        window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
                aviso.classList.add("es-visible");
            });
        });
    }

    function ocultar() {
        aviso.classList.remove("es-visible");
        recordarCerrado();
        window.setTimeout(function () { aviso.hidden = true; }, 450);
    }

    cerrar.addEventListener("click", ocultar);

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && aviso.classList.contains("es-visible")) {
            ocultar();
        }
    });

    boton.addEventListener("click", function () {
        boton.classList.add("es-descargando");
        window.setTimeout(ocultar, 1200);
    });

    // Llegar al final: la sección de descarga o el pie de página entran en pantalla
    const objetivos = [document.getElementById("descargar"), document.querySelector(".footer")].filter(Boolean);

    if ("IntersectionObserver" in window && objetivos.length) {
        const observador = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    mostrar();
                    observador.disconnect();
                }
            });
        }, { threshold: 0.25 });
        objetivos.forEach(function (objetivo) { observador.observe(objetivo); });
    }

    // Respaldo: cerca del final del documento
    window.addEventListener("scroll", function () {
        const restante = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
        if (restante < window.innerHeight * 1.2) mostrar();
    }, { passive: true });
})();

// =========================================================
// ECOAVENTURA · CONFIGURACIÓN DE LA PÁGINA
// Este es el único archivo que hay que tocar para:
//   1. Mostrar el tráiler de YouTube.
//   2. Cambiar o añadir sonidos.
// =========================================================

window.ECOAVENTURA_CONFIG = {

    // -----------------------------------------------------
    // 1. TRÁILER
    // Pega aquí el enlace del tráiler en YouTube, entre las comillas.
    // Sirve cualquiera de estas formas:
    //   "https://www.youtube.com/watch?v=XXXXXXXXXXX"
    //   "https://youtu.be/XXXXXXXXXXX"
    //   "XXXXXXXXXXX"   (solo el identificador del video)
    // Mientras esté vacío, la página muestra un espacio de «Próximamente».
    // -----------------------------------------------------
    trailerYouTube: "https://youtu.be/7VxGux-HhGY",


    // -----------------------------------------------------
    // 2. SONIDO
    // El sonido siempre empieza APAGADO. Solo se activa cuando el
    // visitante pulsa el botón de sonido del menú.
    //
    // Todos los archivos están en la carpeta audio/ y salen del
    // propio juego (efectos y ambientes). Para cambiar uno, reemplaza
    // el archivo o cambia su ruta. Para quitar uno, deja la ruta vacía ("").
    // -----------------------------------------------------
    volumenInicial: 0.5,   // de 0 a 1

    efectos: {
        clic: "audio/clic.mp3",                 // botones y pestañas
        moneda: "audio/moneda.mp3",             // botón principal
        cambioZona: "audio/cambio-zona.mp3",    // al pasar a otro nivel del viaje
        abrir: "audio/abrir.mp3",               // abrir el visor de capturas
        avisoJefe: "audio/aviso-jefe.mp3",      // abrir la ficha de un jefe
        espada: "audio/espada.mp3",             // ver el ataque de un jefe
        hielo: "audio/hielo.mp3",               // cristal de la princesa
        activar: "audio/sonido-activado.mp3",   // al encender el sonido
        salto: "audio/salto.mp3",               // ManyPig salta
        basura: "audio/basura.mp3"              // elegir una basura del registro
    },

    // Ambiente suave de cada zona (suena en bucle y a bajo volumen
    // solo mientras el sonido está activado).
    ambientes: {
        playa: "audio/ambiente-playa.mp3",
        desierto: "audio/ambiente-viento.mp3",
        jungla: "",
        helado: "audio/ambiente-viento.mp3",
        castillo: "audio/ambiente-viento.mp3"
    }
};

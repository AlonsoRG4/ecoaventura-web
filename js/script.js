// =========================================================
// ECOAVENTURA - JAVASCRIPT
// Sin dependencias: IntersectionObserver, requestAnimationFrame,
// <canvas> y <audio> nativos. La configuración del tráiler y de
// los sonidos está en js/config.js.
// =========================================================

(function () {
    "use strict";

    const CONFIG = window.ECOAVENTURA_CONFIG || {};

    const movimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conMovimiento = !movimientoReducido.matches;
    const punteroFino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (conMovimiento) {
        document.documentElement.classList.add("js-movimiento");
    }

    const $ = function (selector, raiz) { return (raiz || document).querySelector(selector); };
    const $$ = function (selector, raiz) { return Array.from((raiz || document).querySelectorAll(selector)); };

    function leerPreferencia(clave, porDefecto) {
        try {
            const valor = window.localStorage.getItem(clave);
            return valor === null ? porDefecto : valor;
        } catch (error) {
            return porDefecto;
        }
    }

    function guardarPreferencia(clave, valor) {
        try {
            window.localStorage.setItem(clave, valor);
        } catch (error) {
            // Almacenamiento bloqueado: la preferencia solo dura esta visita.
        }
    }


    // =====================================================
    // SONIDO (opcional, siempre empieza apagado)
    // =====================================================

    const Sonido = (function () {
        const efectos = CONFIG.efectos || {};
        const ambientes = CONFIG.ambientes || {};
        const cache = {};
        let activo = false;
        let volumen = parseFloat(leerPreferencia("ecoaventura-volumen", String(CONFIG.volumenInicial ?? 0.5)));
        if (!Number.isFinite(volumen)) {
            volumen = 0.5;
        }

        // Ambiente: un <audio> en bucle por archivo, con fundido entre zonas
        const pistas = {};
        let zonaAmbiente = null;
        let fundido = null;

        function crearAudio(ruta) {
            const audio = new Audio();
            audio.preload = "auto";
            audio.src = ruta;
            audio.addEventListener("error", function () {
                audio.dataset.fallo = "true";
            });
            return audio;
        }

        function efecto(nombre) {
            if (!activo) {
                return;
            }
            const ruta = efectos[nombre];
            if (!ruta) {
                return;
            }
            if (!cache[ruta]) {
                cache[ruta] = crearAudio(ruta);
            }
            const base = cache[ruta];
            if (base.dataset.fallo) {
                return;
            }
            // Una copia por reproducción para que se puedan solapar,
            // con un tono un poco distinto cada vez (no suena repetitivo).
            const copia = base.cloneNode();
            copia.volume = Math.min(1, volumen * 0.8);
            copia.preservesPitch = false;
            copia.playbackRate = 0.94 + Math.random() * 0.12;
            copia.play().catch(function () {});
        }

        function volumenAmbiente() {
            return volumen * 0.3;
        }

        function pista(zona) {
            const ruta = ambientes[zona];
            if (!ruta) {
                return null;
            }
            if (!pistas[ruta]) {
                const audio = crearAudio(ruta);
                audio.loop = true;
                audio.volume = 0;
                pistas[ruta] = audio;
            }
            return pistas[ruta];
        }

        function fundir() {
            cancelAnimationFrame(fundido);
            const objetivo = activo ? pista(zonaAmbiente) : null;
            const inicio = performance.now();
            const desde = new Map();
            Object.values(pistas).forEach(function (audio) {
                desde.set(audio, audio.volume);
                if (audio === objetivo && audio.paused && !audio.dataset.fallo) {
                    audio.play().catch(function () {});
                }
            });

            function paso(ahora) {
                const t = Math.min(1, (ahora - inicio) / 900);
                Object.values(pistas).forEach(function (audio) {
                    const meta = audio === objetivo ? volumenAmbiente() : 0;
                    audio.volume = Math.max(0, Math.min(1, desde.get(audio) + (meta - desde.get(audio)) * t));
                    if (t === 1 && meta === 0 && !audio.paused) {
                        audio.pause();
                    }
                });
                if (t < 1) {
                    fundido = requestAnimationFrame(paso);
                }
            }
            fundido = requestAnimationFrame(paso);
        }

        return {
            get activo() { return activo; },
            get volumen() { return volumen; },
            efecto: efecto,
            activar: function (valor) {
                activo = valor;
                fundir();
            },
            cambiarVolumen: function (valor) {
                volumen = valor;
                guardarPreferencia("ecoaventura-volumen", String(valor));
                Object.values(pistas).forEach(function (audio) {
                    if (!audio.paused) {
                        audio.volume = activo && audio === pista(zonaAmbiente) ? volumenAmbiente() : 0;
                    }
                });
            },
            zona: function (zona) {
                if (zona === zonaAmbiente) {
                    return;
                }
                zonaAmbiente = zona;
                if (activo) {
                    fundir();
                }
            },
            pausarTodo: function () {
                Object.values(pistas).forEach(function (audio) { audio.pause(); });
            },
            reanudar: function () {
                if (activo) {
                    fundir();
                }
            }
        };
    })();

    const controlAudio = $("#audio");
    const botonSonido = $("#btn-sonido");
    const estadoSonido = $("#sonido-estado");
    const rangoVolumen = $("#volumen");

    rangoVolumen.value = String(Math.round(Sonido.volumen * 100));

    botonSonido.addEventListener("click", function () {
        const encender = botonSonido.getAttribute("aria-pressed") !== "true";
        botonSonido.setAttribute("aria-pressed", String(encender));
        controlAudio.classList.toggle("activo", encender);
        estadoSonido.textContent = encender ? "Sonido: sí" : "Sonido: no";
        Sonido.activar(encender);
        Sonido.efecto("activar");
    });

    rangoVolumen.addEventListener("input", function () {
        Sonido.cambiarVolumen(Number(rangoVolumen.value) / 100);
    });

    rangoVolumen.addEventListener("change", function () {
        Sonido.efecto("clic");
    });

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            Sonido.pausarTodo();
        } else {
            Sonido.reanudar();
        }
    });

    // Efectos de los botones: data-sfx elige el sonido; los demás, un clic suave.
    document.addEventListener("click", function (evento) {
        const objetivo = evento.target.closest("[data-sfx], .btn, .animaciones__btn, .filtro, .faq-question, .mapa__nodo, .clip__btn, .visor__btn, .enlace-jefe");
        if (!objetivo || objetivo === botonSonido) {
            return;
        }
        Sonido.efecto(objetivo.dataset.sfx || "clic");
    });

    // Chispas de moneda al pulsar un botón dorado
    document.addEventListener("click", function (evento) {
        const boton = evento.target.closest(".btn--primario");
        if (!boton || !conMovimiento || boton.getAttribute("aria-disabled") === "true") {
            return;
        }
        const x = evento.clientX || boton.getBoundingClientRect().left + boton.offsetWidth / 2;
        const y = evento.clientY || boton.getBoundingClientRect().top + boton.offsetHeight / 2;
        for (let i = 0; i < 8; i++) {
            const chispa = document.createElement("span");
            const angulo = (Math.PI * 2 * i) / 8 + Math.random() * 0.4;
            const distancia = 28 + Math.random() * 26;
            chispa.className = "chispa";
            chispa.style.left = x - 3 + "px";
            chispa.style.top = y - 3 + "px";
            chispa.style.setProperty("--dx", Math.cos(angulo) * distancia + "px");
            chispa.style.setProperty("--dy", Math.sin(angulo) * distancia + "px");
            chispa.addEventListener("animationend", function () { chispa.remove(); });
            document.body.appendChild(chispa);
        }
    });


    // =====================================================
    // NAVEGACIÓN: menú móvil y sección activa
    // =====================================================

    const navbar = $("#navbar");
    const botonMenu = $(".navbar__menu-btn");
    const enlacesMenu = $$(".navbar__menu ul a");

    function cerrarMenu() {
        navbar.classList.remove("abierto");
        botonMenu.setAttribute("aria-expanded", "false");
    }

    botonMenu.addEventListener("click", function () {
        const abierto = navbar.classList.toggle("abierto");
        botonMenu.setAttribute("aria-expanded", String(abierto));
    });

    $$('.navbar a[href^="#"]').forEach(function (enlace) {
        enlace.addEventListener("click", cerrarMenu);
    });

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && navbar.classList.contains("abierto")) {
            cerrarMenu();
            botonMenu.focus();
        }
    });

    document.addEventListener("click", function (evento) {
        if (navbar.classList.contains("abierto") && !navbar.contains(evento.target)) {
            cerrarMenu();
        }
    });

    // Se vigilan todas las secciones: las que no están en el menú lo dejan sin marcar
    const secciones = $$("main > section");

    const observadorSecciones = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (!entrada.isIntersecting) {
                return;
            }
            enlacesMenu.forEach(function (enlace) {
                if (enlace.getAttribute("href") === "#" + entrada.target.id) {
                    enlace.setAttribute("aria-current", "true");
                } else {
                    enlace.removeAttribute("aria-current");
                }
            });
        });
    }, { rootMargin: "-45% 0px -50% 0px" });

    secciones.forEach(function (seccion) { observadorSecciones.observe(seccion); });


    // =====================================================
    // PARTÍCULAS PIXEL (un <canvas> por escena, pocas y ligeras)
    // =====================================================

    const TIPOS = {
        brillo:   { colores: ["#fff359", "#ffffff", "#fff3a6"], tam: [2, 3], vx: [-6, 6], vy: [-18, -6], vida: [3, 6], parpadeo: true },
        playa:    { colores: ["#ffffff", "#eff3ff", "#fff359"], tam: [2, 3], vx: [-8, 8], vy: [-14, -4], vida: [3, 6], parpadeo: true },
        desierto: { colores: ["#f8c98a", "#fff3a6", "#e69c69"], tam: [2, 3], vx: [-90, -40], vy: [-6, 6], vida: [4, 8], ondula: 10 },
        jungla:   { colores: ["#6c9551", "#a0c687", "#36581e", "#d3f9bc"], tam: [3, 5], vx: [-10, 10], vy: [18, 38], vida: [6, 11], ondula: 24, hoja: true },
        helado:   { colores: ["#ffffff", "#e6f4f9", "#86b6d4"], tam: [2, 4], vx: [-24, -6], vy: [26, 60], vida: [6, 11], ondula: 14 },
        castillo: { colores: ["#86b6d4", "#e6f4f9", "#89aece"], tam: [2, 3], vx: [-6, 6], vy: [-22, -8], vida: [4, 8], parpadeo: true },
        cristal:  { colores: ["#e6f4f9", "#86b6d4", "#ffffff", "#fff359"], tam: [2, 3], vx: [-14, -2], vy: [12, 34], vida: [6, 10], ondula: 12, parpadeo: true }
    };

    function azar(rango) {
        return rango[0] + Math.random() * (rango[1] - rango[0]);
    }

    function Particulas(canvas, tipo) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.tipo = tipo;
        this.lista = [];
        this.activo = false;
        this.visible = false;
        this.ultimo = 0;
        this.frame = null;
        this.paso = this.paso.bind(this);
        this.medir();
    }

    Particulas.prototype.medir = function () {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        this.ancho = rect.width;
        this.alto = rect.height;
        this.canvas.width = Math.max(1, Math.round(rect.width * dpr));
        this.canvas.height = Math.max(1, Math.round(rect.height * dpr));
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        this.ctx.imageSmoothingEnabled = false;
        const modesto = (navigator.hardwareConcurrency || 4) <= 4 || window.innerWidth < 640;
        const cantidad = Math.round(Math.min(70, Math.max(16, (rect.width * rect.height) / 16000)) * (modesto ? 0.55 : 1));
        while (this.lista.length < cantidad) {
            this.lista.push(this.nueva(true));
        }
        this.lista.length = cantidad;
    };

    Particulas.prototype.nueva = function (inicial) {
        const t = TIPOS[this.tipo] || TIPOS.brillo;
        const vy = azar(t.vy);
        const vx = azar(t.vx);
        let x = Math.random() * this.ancho;
        let y = Math.random() * this.alto;
        if (!inicial) {
            if (vy > 8) { y = -10; }
            else if (vy < -8) { y = this.alto + 10; }
            if (vx < -30) { x = this.ancho + 10; }
        }
        return {
            x: x, y: y, vx: vx, vy: vy,
            tam: Math.round(azar(t.tam)),
            color: t.colores[Math.floor(Math.random() * t.colores.length)],
            vida: azar(t.vida), edad: inicial ? Math.random() * 3 : 0,
            fase: Math.random() * Math.PI * 2,
            tipo: this.tipo
        };
    };

    Particulas.prototype.cambiar = function (tipo) {
        if (tipo === this.tipo) {
            return;
        }
        this.tipo = tipo;
        // La mitad cambia al momento; el resto, al renacer.
        for (let i = 0; i < this.lista.length; i += 2) {
            this.lista[i] = this.nueva(true);
        }
    };

    Particulas.prototype.paso = function (ahora) {
        const dt = Math.min(0.05, (ahora - (this.ultimo || ahora)) / 1000);
        this.ultimo = ahora;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.ancho, this.alto);

        for (let i = 0; i < this.lista.length; i++) {
            let p = this.lista[i];
            const t = TIPOS[p.tipo] || TIPOS.brillo;
            p.edad += dt;
            p.x += p.vx * dt + (t.ondula ? Math.sin(p.edad * 1.6 + p.fase) * t.ondula * dt : 0);
            p.y += p.vy * dt;

            if (p.edad > p.vida || p.y < -20 || p.y > this.alto + 20 || p.x < -20 || p.x > this.ancho + 20) {
                this.lista[i] = p = this.nueva(false);
                continue;
            }

            const entrada = Math.min(1, p.edad / 0.8);
            const salida = Math.min(1, (p.vida - p.edad) / 0.8);
            let alfa = Math.min(entrada, salida);
            if (t.parpadeo) {
                alfa *= 0.55 + 0.45 * Math.sin(p.edad * 4 + p.fase);
            }
            ctx.globalAlpha = Math.max(0, alfa);
            ctx.fillStyle = p.color;
            const x = Math.round(p.x);
            const y = Math.round(p.y);
            if (t.hoja) {
                const giro = Math.sin(p.edad * 2 + p.fase) > 0;
                ctx.fillRect(x, y, giro ? p.tam : 2, giro ? 2 : p.tam);
            } else {
                ctx.fillRect(x, y, p.tam, p.tam);
            }
        }
        ctx.globalAlpha = 1;

        if (this.activo) {
            this.frame = requestAnimationFrame(this.paso);
        }
    };

    Particulas.prototype.encender = function () {
        if (this.activo || !conMovimiento) {
            return;
        }
        this.activo = true;
        this.ultimo = 0;
        this.frame = requestAnimationFrame(this.paso);
    };

    Particulas.prototype.apagar = function () {
        this.activo = false;
        cancelAnimationFrame(this.frame);
    };

    const escenasParticulas = [];

    if (conMovimiento) {
        const observadorParticulas = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                const escena = escenasParticulas.find(function (e) { return e.canvas === entrada.target; });
                if (!escena) {
                    return;
                }
                escena.visible = entrada.isIntersecting;
                if (escena.visible && !document.hidden) {
                    escena.encender();
                } else {
                    escena.apagar();
                }
            });
        });

        $$("canvas.particulas").forEach(function (canvas) {
            const escena = new Particulas(canvas, canvas.dataset.particulas);
            escenasParticulas.push(escena);
            observadorParticulas.observe(canvas);
        });

        document.addEventListener("visibilitychange", function () {
            escenasParticulas.forEach(function (escena) {
                if (document.hidden) {
                    escena.apagar();
                } else if (escena.visible) {
                    escena.encender();
                }
            });
        });

        let esperaMedida = null;
        window.addEventListener("resize", function () {
            clearTimeout(esperaMedida);
            esperaMedida = setTimeout(function () {
                escenasParticulas.forEach(function (escena) { escena.medir(); });
            }, 200);
        });
    }

    const particulasViaje = escenasParticulas.find(function (e) { return e.canvas.id === "particulas-viaje"; });


    // =====================================================
    // DESPLAZAMIENTO: barra "ISLA EXPLORADA", parallax y escenas
    // =====================================================

    const relleno = $("#exploracion-relleno");
    const valor = $("#exploracion-valor");
    const hero = $("#inicio");
    const capasParallax = $$("[data-parallax]", hero);
    const veloHero = $(".hero__velo");
    const manyPigHero = $("#hero-manypig");
    const spriteHero = $(".sprite", manyPigHero);
    const pista = $(".viaje__pista");
    const tirasViaje = $$(".zona__capa--tira");
    const final = $("#princesa");
    const fondoFinal = $(".final__fondo");

    let ultimoPorcentaje = -1;
    let esperandoFrame = false;
    let temporizadorCorrer = null;
    let llegadaTerminada = !conMovimiento;

    function actualizarScroll() {
        esperandoFrame = false;

        const y = window.scrollY;
        const altoVentana = window.innerHeight;
        const recorrido = document.documentElement.scrollHeight - altoVentana;
        const progreso = recorrido > 0 ? Math.min(1, Math.max(0, y / recorrido)) : 0;
        const porcentaje = Math.round(progreso * 100);

        relleno.style.transform = "scaleX(" + progreso + ")";
        if (porcentaje !== ultimoPorcentaje) {
            valor.textContent = porcentaje + "%";
            ultimoPorcentaje = porcentaje;
        }

        if (!conMovimiento) {
            return;
        }

        // Portada: las capas avanzan con las proporciones de Godot y la
        // playa se oscurece al bajar hacia el tráiler.
        const altoHero = hero.offsetHeight;
        if (y < altoHero) {
            capasParallax.forEach(function (capa) {
                const factor = parseFloat(capa.dataset.parallax);
                capa.style.transform = "translate3d(" + (-y * factor * 0.6) + "px, 0, 0)";
            });
            veloHero.style.setProperty("--velo", Math.min(0.85, (y / altoHero) * 1.1).toFixed(3));
        }

        // Viaje: cada capa de la zona se desplaza a su velocidad (motion_scale)
        const rectPista = pista.getBoundingClientRect();
        if (rectPista.top < altoVentana && rectPista.bottom > 0) {
            const avance = Math.max(0, -rectPista.top);
            tirasViaje.forEach(function (tira) {
                const velocidad = parseFloat(tira.dataset.velocidad) || 0;
                tira.style.setProperty("--x", -Math.min(2300, avance * velocidad * 0.45) + "px");
            });
        }

        // Final: la cámara se acerca despacio al castillo
        const rectFinal = final.getBoundingClientRect();
        if (rectFinal.top < altoVentana && rectFinal.bottom > 0) {
            const t = 1 - (rectFinal.bottom / (altoVentana + rectFinal.height));
            fondoFinal.style.setProperty("--acerca", (1 + t * 0.08).toFixed(4));
        }
    }

    function alHacerScroll() {
        if (!esperandoFrame) {
            esperandoFrame = true;
            requestAnimationFrame(actualizarScroll);
        }

        // ManyPig corre mientras la playa se mueve y se detiene al parar
        if (conMovimiento && llegadaTerminada && window.scrollY < hero.offsetHeight) {
            spriteHero.dataset.anim = "run";
            clearTimeout(temporizadorCorrer);
            temporizadorCorrer = setTimeout(function () {
                spriteHero.dataset.anim = "idle";
            }, 180);
        }
    }

    window.addEventListener("scroll", alHacerScroll, { passive: true });
    window.addEventListener("resize", alHacerScroll);
    actualizarScroll();


    // =====================================================
    // PORTADA: título, llegada de ManyPig y profundidad con el cursor
    // =====================================================

    $$(".logotipo__linea > span").forEach(function (letra, indice) {
        letra.style.setProperty("--i", indice);
    });

    if (conMovimiento) {
        spriteHero.dataset.anim = "run";
        manyPigHero.classList.add("llega");

        manyPigHero.addEventListener("animationend", function (evento) {
            if (evento.animationName !== "llegar") {
                return;
            }
            manyPigHero.classList.remove("llega");
            spriteHero.dataset.anim = "idle";
            llegadaTerminada = true;
        });
    }

    if (conMovimiento && punteroFino) {
        const capasProfundas = $$("[data-profundidad]", hero).concat([manyPigHero]);
        let objetivoX = 0;
        let objetivoY = 0;
        let actualX = 0;
        let actualY = 0;
        let animando = false;

        function moverCapas() {
            actualX += (objetivoX - actualX) * 0.08;
            actualY += (objetivoY - actualY) * 0.08;
            capasProfundas.forEach(function (capa) {
                const profundidad = parseFloat(capa.dataset.profundidad || 22);
                capa.style.setProperty("--px", (actualX * profundidad).toFixed(2) + "px");
                capa.style.setProperty("--py", (actualY * profundidad * 0.4).toFixed(2) + "px");
            });
            if (Math.abs(objetivoX - actualX) > 0.001 || Math.abs(objetivoY - actualY) > 0.001) {
                requestAnimationFrame(moverCapas);
            } else {
                animando = false;
            }
        }

        hero.addEventListener("pointermove", function (evento) {
            objetivoX = (evento.clientX / window.innerWidth - 0.5) * -1;
            objetivoY = (evento.clientY / window.innerHeight - 0.5) * -1;
            if (!animando) {
                animando = true;
                requestAnimationFrame(moverCapas);
            }
        });

        hero.addEventListener("pointerleave", function () {
            objetivoX = 0;
            objetivoY = 0;
            if (!animando) {
                animando = true;
                requestAnimationFrame(moverCapas);
            }
        });
    }


    // =====================================================
    // ANIMACIONES AL HACER SCROLL
    // =====================================================

    $$(".jefe").forEach(function (jefe, indice) {
        jefe.style.setProperty("--orden", indice);
    });

    const elementosRevelar = $$(".revelar");

    if (conMovimiento && "IntersectionObserver" in window) {
        const observadorRevelar = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("mostrar");
                    observadorRevelar.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

        elementosRevelar.forEach(function (elemento) { observadorRevelar.observe(elemento); });
    } else {
        elementosRevelar.forEach(function (elemento) { elemento.classList.add("mostrar"); });
    }

    // Escena final: franjas de cine y título
    new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                final.classList.add("en-escena");
            }
        });
    }, { threshold: 0.3 }).observe(final);


    // =====================================================
    // VIDEOS CORTOS DEL JUEGO (siempre en silencio, con pausa)
    // =====================================================

    function prepararClip(clip) {
        const video = $("video", clip);
        const boton = $(".clip__btn", clip);
        const texto = $(".clip__texto", clip);

        function pintar() {
            const reproduciendo = !video.paused;
            boton.setAttribute("aria-pressed", String(reproduciendo));
            texto.textContent = reproduciendo ? "Pausar" : "Reproducir";
        }

        video.addEventListener("play", pintar);
        video.addEventListener("pause", pintar);

        boton.addEventListener("click", function () {
            if (video.paused) {
                video.dataset.pausadoPorUsuario = "";
                video.play().catch(function () {});
            } else {
                video.dataset.pausadoPorUsuario = "true";
                video.pause();
            }
        });

        return video;
    }

    const clipsNivel = new Map();
    $$(".nivel").forEach(function (nivel) {
        const clip = $(".clip", nivel);
        if (clip) {
            clipsNivel.set(nivel, prepararClip(clip));
        }
    });

    function reproducirSiSePuede(video) {
        if (!video || !conMovimiento || video.dataset.pausadoPorUsuario === "true") {
            return;
        }
        video.play().catch(function () {});
    }


    // =====================================================
    // EL VIAJE: cambia la zona según el nivel visible
    // =====================================================

    const viaje = $("#viaje");
    const zonas = $$(".zona");
    const nodosMapa = $$(".mapa__nodo");
    const etiquetaZona = $("#exploracion-zona");
    const mapa = $(".mapa");
    const ORDEN_ZONAS = ["playa", "desierto", "jungla", "helado", "castillo"];
    const NOMBRES_ZONA = { playa: "PLAYA", desierto: "DESIERTO", jungla: "JUNGLA", helado: "REINO HELADO", castillo: "CASTILLO" };

    let zonaViaje = "playa";
    let zonaPagina = null;

    // Las capas de cada zona se cargan cuando el visitante se acerca
    new IntersectionObserver(function (entradas, observador) {
        entradas.forEach(function (entrada) {
            if (!entrada.isIntersecting) {
                return;
            }
            $$(".zona__capa[data-img]", viaje).forEach(function (capa) {
                capa.style.backgroundImage = "url(\"" + capa.dataset.img + "\")";
            });
            observador.disconnect();
        });
    }, { rootMargin: "900px 0px" }).observe(viaje);

    function ponerZonaPagina(zona, etiqueta) {
        if (!zona) {
            return;
        }
        etiquetaZona.textContent = etiqueta || NOMBRES_ZONA[zona] || zona.toUpperCase();
        if (zona === zonaPagina) {
            return;
        }
        zonaPagina = zona;
        document.body.dataset.zona = zona;
        Sonido.zona(zona);
    }

    function activarZona(zona, nivel) {
        if (zona !== zonaViaje) {
            zonaViaje = zona;
            zonas.forEach(function (capa) {
                capa.classList.toggle("activa", capa.dataset.zona === zona);
            });
            if (particulasViaje) {
                particulasViaje.cambiar(zona);
            }
            Sonido.efecto("cambioZona");
        }

        const indice = ORDEN_ZONAS.indexOf(zona);
        nodosMapa.forEach(function (nodo, i) {
            if (i === indice) {
                nodo.setAttribute("aria-current", "step");
            } else {
                nodo.removeAttribute("aria-current");
            }
            nodo.classList.toggle("visto", i < indice);
        });
        mapa.style.setProperty("--avance", String(indice / (ORDEN_ZONAS.length - 1)));

        $$(".nivel").forEach(function (otro) {
            const activo = otro === nivel;
            otro.classList.toggle("activo", activo);
            const video = clipsNivel.get(otro);
            if (!video) {
                return;
            }
            if (activo) {
                reproducirSiSePuede(video);
            } else if (!video.paused) {
                video.pause();
            }
        });
    }

    // Una línea en el centro de la pantalla decide qué zona se ve
    const observadorZonas = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (!entrada.isIntersecting) {
                return;
            }
            const elemento = entrada.target;
            if (elemento.classList.contains("nivel")) {
                activarZona(elemento.dataset.zona, elemento);
                ponerZonaPagina(elemento.dataset.zona);
            } else if (elemento.classList.contains("viaje__intro")) {
                activarZona("playa", null);
                ponerZonaPagina("playa");
            } else {
                ponerZonaPagina(elemento.dataset.ambiente, elemento.dataset.hud);
            }
        });
    }, { rootMargin: "-50% 0px -50% 0px" });

    $$(".nivel, .viaje__intro, [data-ambiente]").forEach(function (elemento) {
        observadorZonas.observe(elemento);
    });

    // Si el viaje sale de la pantalla, sus videos se detienen
    new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (!entrada.isIntersecting) {
                clipsNivel.forEach(function (video) {
                    if (!video.paused) {
                        video.pause();
                    }
                });
            }
        });
    }).observe(viaje);


    // =====================================================
    // JEFES: tarjetas con profundidad y ficha ampliada
    // =====================================================

    const tarjetas = $$(".jefe");
    const fichaJefe = $("#ficha-jefe");
    const fjEscenario = $("#fj-escenario");
    const fjSprite = $("#fj-sprite");
    const fjNombre = $("#fj-nombre");
    const fjZona = $("#fj-zona");
    const fjCuerpo = $("#fj-cuerpo");
    const fjVideoMarco = $("#fj-video-marco");
    const fjVideo = $("#fj-video");
    const fjPie = $("#fj-pie");
    const fjContador = $("#fj-contador");
    const fjBotonesAnim = $$(".ficha-jefe__anim .animaciones__btn");
    let indiceJefe = 0;
    let origenFicha = null;

    prepararClip($(".clip", fjVideoMarco));

    function zonaDeTarjeta(tarjeta) {
        const clase = Array.from(tarjeta.classList).find(function (c) {
            return /^jefe--(playa|desierto|jungla|helado|castillo)$/.test(c);
        });
        return clase ? clase.replace("jefe--", "") : "playa";
    }

    tarjetas.forEach(function (tarjeta, indice) {
        const boton = $(".jefe__btn", tarjeta);
        const sprite = $(".sprite", tarjeta);

        function atacar() { sprite.dataset.anim = "ataque"; }
        function reposar() { sprite.dataset.anim = "idle"; }

        boton.addEventListener("pointerenter", function (evento) {
            if (evento.pointerType !== "touch") {
                atacar();
            }
        });
        boton.addEventListener("pointerleave", function () {
            reposar();
            boton.style.setProperty("--rx", "0deg");
            boton.style.setProperty("--ry", "0deg");
        });
        boton.addEventListener("focus", atacar);
        boton.addEventListener("blur", reposar);

        if (conMovimiento && punteroFino) {
            boton.addEventListener("pointermove", function (evento) {
                const rect = boton.getBoundingClientRect();
                const x = (evento.clientX - rect.left) / rect.width;
                const y = (evento.clientY - rect.top) / rect.height;
                boton.style.setProperty("--ry", ((x - 0.5) * 10).toFixed(2) + "deg");
                boton.style.setProperty("--rx", ((0.5 - y) * 8).toFixed(2) + "deg");
                boton.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
                boton.style.setProperty("--my", (y * 100).toFixed(1) + "%");
            });
        }

        boton.addEventListener("click", function () {
            abrirJefe(indice, boton);
        });
    });

    function pintarAnimacionFicha(anim) {
        fjSprite.dataset.anim = anim;
        fjBotonesAnim.forEach(function (b) {
            b.setAttribute("aria-pressed", String(b.dataset.anim === anim));
        });
    }

    fjBotonesAnim.forEach(function (boton) {
        boton.addEventListener("click", function () {
            pintarAnimacionFicha(boton.dataset.anim);
            if (boton.dataset.anim === "ataque") {
                Sonido.efecto("espada");
            }
        });
    });

    function mostrarJefe(indice) {
        indiceJefe = (indice + tarjetas.length) % tarjetas.length;
        const tarjeta = tarjetas[indiceJefe];
        const zona = zonaDeTarjeta(tarjeta);

        fichaJefe.dataset.zona = zona;
        fjEscenario.dataset.zona = zona;
        fjSprite.dataset.jefe = tarjeta.dataset.jefe;
        pintarAnimacionFicha("ataque");

        fjNombre.textContent = tarjeta.dataset.nombre;
        fjZona.textContent = tarjeta.dataset.zona;
        fjCuerpo.replaceChildren($("template", tarjeta).content.cloneNode(true));
        fjContador.textContent = (indiceJefe + 1) + " / " + tarjetas.length;

        fjVideo.pause();
        fjVideo.dataset.pausadoPorUsuario = "";
        if (tarjeta.dataset.clip) {
            fjVideoMarco.hidden = false;
            fjVideo.poster = tarjeta.dataset.poster || "";
            fjVideo.src = tarjeta.dataset.clip;
            fjVideo.setAttribute("aria-label", "Toma real del juego: " + tarjeta.dataset.nombre + ".");
            fjPie.textContent = "Toma real del combate.";
            reproducirSiSePuede(fjVideo);
        } else {
            fjVideo.removeAttribute("src");
            fjVideo.load();
            fjVideoMarco.hidden = true;
        }
    }

    function abrirJefe(indice, origen) {
        origenFicha = origen || null;
        mostrarJefe(indice);
        Sonido.efecto("avisoJefe");
        if (typeof fichaJefe.showModal === "function") {
            fichaJefe.showModal();
        }
    }

    $("#fj-anterior").addEventListener("click", function () { mostrarJefe(indiceJefe - 1); });
    $("#fj-siguiente").addEventListener("click", function () { mostrarJefe(indiceJefe + 1); });
    $("#fj-cerrar").addEventListener("click", function () { fichaJefe.close(); });

    fichaJefe.addEventListener("click", function (evento) {
        if (evento.target === fichaJefe) {
            fichaJefe.close();
        }
    });

    fichaJefe.addEventListener("keydown", function (evento) {
        if (evento.target.closest("button") && (evento.key === "ArrowLeft" || evento.key === "ArrowRight")) {
            mostrarJefe(indiceJefe + (evento.key === "ArrowLeft" ? -1 : 1));
        }
    });

    fichaJefe.addEventListener("close", function () {
        fjVideo.pause();
        if (origenFicha && document.contains(origenFicha)) {
            origenFicha.focus();
        }
    });

    // Botones "Ver al jefe" de cada nivel
    $$("[data-abrir-jefe]").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const indice = tarjetas.findIndex(function (t) { return t.dataset.jefe === boton.dataset.abrirJefe; });
            if (indice >= 0) {
                abrirJefe(indice, boton);
            }
        });
    });


    // =====================================================
    // REGISTRO DE BASURA (datos de resources/basura/*.tres del juego)
    // =====================================================

    const BASURAS = [
        { id: "sodapop", img: "img/juego/basura_plastico.png", nombre: "Lata de refresco", contenedor: "plastico", material: "Aluminio con un barniz plástico por dentro", degradacion: "≈ 200 años (aprox.)", consejo: "Enjuágala, aplástala y llévala al contenedor de envases.", efectos: ["Los animales se cortan o se atoran con ella.", "Acumula agua donde se crían mosquitos.", "Hacer aluminio nuevo gasta mucha energía: reciclarlo ahorra casi toda."] },
        { id: "basuragrande", img: "img/juego/basura_general.png", nombre: "Bolsa de basura revuelta", contenedor: "plastico", material: "Mezcla de residuos sin separar (plástico, cartón, restos de comida)", degradacion: "De semanas (comida) a cientos de años (plásticos)", consejo: "Separa en casa: orgánico, reciclable y resto.", efectos: ["Revuelta, ya casi nada de lo que contiene se puede reciclar.", "Atrae fauna nociva y suelta líquidos contaminantes (lixiviados).", "En la playa el viento y la marea la arrastran al mar."] },
        { id: "carton", img: "img/juego/basura_carton.png", nombre: "Caja de cartón", contenedor: "carton", material: "Cartón corrugado (fibras de papel)", degradacion: "≈ 2 meses a 1 año", consejo: "Desármala, quítale la cinta y guárdala seca para reciclar.", efectos: ["Mojado se deshace y ya no sirve para reciclar.", "Cintas y tintas ensucian la arena y el suelo.", "Tirarlo desperdicia árboles que se ahorrarían reciclando."] },
        { id: "metal", img: "img/juego/basura_metal.png", nombre: "Lata de conserva", contenedor: "metal", material: "Hojalata (acero con una capa fina de estaño)", degradacion: "≈ 50 a 100 años (se oxida poco a poco)", consejo: "Enjuágala y sepárala con los metales.", efectos: ["Su borde cortante lastima a personas y animales.", "Al oxidarse suelta hierro y restos de comida al suelo.", "El acero se puede reciclar una y otra vez sin perder calidad."] },
        { id: "botella_vidrio", img: "img/basura/botella_vidrio.png", nombre: "Botella de vidrio", contenedor: "vidrio", material: "Vidrio (arena, sosa y cal fundidas)", degradacion: "≈ 4,000 años o más (casi no se degrada)", consejo: "Se recicla al 100 % y sin límite: llévala limpia al contenedor de vidrio.", efectos: ["Sus pedazos cortan a personas y animales.", "Al sol puede actuar como lupa e iniciar incendios en el pasto seco.", "Los animales pequeños quedan atrapados dentro."] },
        { id: "bolsa_plastico", img: "img/basura/bolsa_plastico.png", nombre: "Bolsa de plástico", contenedor: "plastico", material: "Polietileno (plástico de película)", degradacion: "≈ 150 años (luego queda como microplástico)", consejo: "Usa bolsas de tela; si ya la tienes, reutilízala antes de desecharla.", efectos: ["El viento la arrastra kilómetros y se engancha en cactus y arbustos.", "Animales la confunden con comida y se asfixian o enferman.", "Se rompe en microplásticos que llegan al suelo y al agua."] },
        { id: "llanta", img: "img/basura/llanta.png", nombre: "Llanta usada", contenedor: "especial", material: "Caucho con acero y fibras", degradacion: "Más de 500 años (aprox.)", consejo: "Entrégala en la llantera o en un centro de acopio de llantas.", efectos: ["Acumula agua de lluvia donde se crían mosquitos que transmiten dengue.", "Si se quema suelta humo negro y aceites tóxicos.", "Libera zinc y otros metales que contaminan el suelo."] },
        { id: "pila", img: "img/basura/pila.png", nombre: "Pila usada", contenedor: "peligroso", material: "Metal, zinc, manganeso y electrolito alcalino", degradacion: "Cientos de años la carcasa (≈ 100 a 500); los metales no desaparecen", consejo: "Nunca a la basura común: depósitala en un contenedor especial de pilas.", efectos: ["Al oxidarse suelta químicos que se filtran al suelo y al agua subterránea.", "Los metales pesados se acumulan en plantas y animales.", "Puede quemar la piel o los ojos si se derrama."] },
        { id: "vaso_unicel", img: "img/basura/vaso_unicel.png", nombre: "Vaso de unicel", contenedor: "plastico", material: "Poliestireno expandido (EPS)", degradacion: "≈ 500 años o más", consejo: "Prefiere tu propio vaso o termo reutilizable.", efectos: ["Es tan ligero que el viento lo dispersa y se rompe en bolitas.", "Aves y reptiles comen esas bolitas y se enferman.", "Con calor puede soltar sustancias dañinas a la bebida."] },
        { id: "red_pesca", img: "img/basura/red_pesca.png", nombre: "Red de pesca abandonada", contenedor: "plastico", material: "Nailon (plástico)", degradacion: "≈ 600 años", consejo: "Las redes viejas se reparan o se entregan a programas de reciclaje de redes.", efectos: ["Sigue atrapando peces, tortugas y aves aunque nadie la use (\"pesca fantasma\").", "Se enreda en raíces y plantas de ríos y manglares.", "Con el tiempo suelta microplásticos al agua."] },
        { id: "celular", img: "img/basura/celular.png", nombre: "Celular viejo", contenedor: "especial", material: "Plástico, vidrio, metales y batería de litio", degradacion: "Cientos a miles de años (aprox.); sus metales no se degradan", consejo: "Llévalo a un acopio de electrónicos o a la tienda donde lo compraste.", efectos: ["Contiene plomo, cadmio y otros metales que contaminan suelo y ríos.", "Su batería puede incendiarse si se golpea o se calienta.", "Se desperdician oro, plata y cobre que podrían recuperarse."] },
        { id: "panal", img: "img/basura/panal.png", nombre: "Pañal desechable", contenedor: "especial", material: "Celulosa, plásticos y gel absorbente", degradacion: "≈ 300 a 500 años", consejo: "Envuélvelo y deposítalo en la basura sanitaria, nunca en ríos o campos.", efectos: ["Sus desechos contaminan el agua con bacterias.", "Los plásticos y el gel quedan en el suelo por siglos.", "Ocupa mucho espacio en los basureros."] },
        { id: "pesticida", img: "img/basura/pesticida.png", nombre: "Envase de pesticida", contenedor: "peligroso", material: "Plástico (polietileno) con restos de químicos", degradacion: "≈ 100 a 500 años el envase; los químicos pueden durar años en el suelo", consejo: "Se enjuaga tres veces, se perfora y se entrega en un centro de acopio autorizado.", efectos: ["Los restos envenenan peces, ranas y abejas.", "Contamina pozos y ríos de los que bebe la gente.", "Reutilizarlo para agua o comida puede causar intoxicaciones."] },
        { id: "tetrapak", img: "img/basura/tetrapak.png", nombre: "Envase multicapa (jugo)", contenedor: "carton", material: "Cartón con capas de plástico y aluminio", degradacion: "≈ 30 años o más (el plástico y el aluminio tardan más que el cartón)", consejo: "Enjuágalo, aplástalo y sepáralo para que una planta recicladora lo aproveche.", efectos: ["Tirado en el campo se deshace y deja capas de plástico y aluminio.", "Los restos de jugo atraen insectos y fauna nociva.", "Ocupa espacio que podría ahorrarse aplastándolo."] },
        { id: "colilla", img: "img/basura/colilla.png", nombre: "Colilla de cigarro", contenedor: "peligroso", material: "Filtro de acetato de celulosa (un plástico) con restos de tabaco", degradacion: "≈ 10 años o más (aprox.)", consejo: "Nunca al suelo: apágala bien y llévala a un contenedor para colillas o de residuos peligrosos.", efectos: ["Una sola colilla puede contaminar varios litros de agua con nicotina y metales.", "Los animales las tragan confundiéndolas con comida.", "Es de los residuos más encontrados en calles y playas."] },
        { id: "foco_ahorrador", img: "img/basura/foco_ahorrador.png", nombre: "Foco ahorrador", contenedor: "especial", material: "Vidrio, metales, plástico y un poco de mercurio", degradacion: "Miles de años el vidrio; el mercurio no desaparece", consejo: "No va a la basura común: llévalo a un punto de acopio de lámparas.", efectos: ["Si se rompe suelta vapor de mercurio, tóxico para personas y animales.", "El mercurio llega al agua y se acumula en los peces.", "Sus vidrios rotos causan cortes."] },
        { id: "lata_aerosol", img: "img/basura/lata_aerosol.png", nombre: "Lata de aerosol", contenedor: "peligroso", material: "Hojalata o aluminio con gas a presión y restos químicos", degradacion: "≈ 200 a 500 años", consejo: "Úsala hasta vaciarla y llévala a un acopio de residuos peligrosos.", efectos: ["Puede explotar con el calor o el fuego.", "Sus restos de pintura o insecticida contaminan suelo y agua.", "Algunos de sus gases dañan el aire que respiramos."] },
        { id: "botella_pet", img: "img/basura/botella_pet.png", nombre: "Botella de plástico PET", contenedor: "plastico", material: "Polietileno tereftalato (PET, plástico número 1)", degradacion: "≈ 450 años", consejo: "Vacíala, aplástala y recíclala; mejor aún, usa una botella reutilizable.", efectos: ["Se rompe en microplásticos que llegan a ríos, mares y hasta al hielo de los polos.", "Los animales se enredan o la confunden con comida.", "Fabricar una nueva gasta petróleo y mucha agua."] },
        { id: "periodico", img: "img/basura/periodico.png", nombre: "Periódico viejo", contenedor: "carton", material: "Papel (fibras de celulosa) con tintas", degradacion: "≈ 6 semanas a 1 año (en el frío tarda más)", consejo: "Guárdalo seco y llévalo al contenedor de papel y cartón.", efectos: ["Mojado y sucio ya no se puede reciclar.", "Sus tintas pueden soltar sustancias al suelo.", "Desperdiciar papel obliga a talar más árboles."] }
    ];

    const NOMBRES_CONTENEDOR = { plastico: "Plástico", carton: "Cartón", metal: "Metal", vidrio: "Vidrio", peligroso: "Peligroso", especial: "Especial" };

    const listaRegistro = $("#registro-lista");
    const filtros = $$(".filtro");
    const rf = {
        img: $("#rf-img"),
        nombre: $("#rf-nombre"),
        contenedor: $("#rf-contenedor"),
        material: $("#rf-material"),
        degradacion: $("#rf-degradacion"),
        consejo: $("#rf-consejo"),
        efectos: $("#rf-efectos")
    };

    BASURAS.forEach(function (basura, indice) {
        const item = document.createElement("li");
        item.className = "registro__item";
        item.dataset.contenedor = basura.contenedor;

        const boton = document.createElement("button");
        boton.className = "basura-btn";
        boton.type = "button";
        boton.dataset.contenedor = basura.contenedor;
        boton.setAttribute("aria-pressed", String(indice === 0));
        boton.setAttribute("aria-controls", "registro-ficha");

        const img = document.createElement("img");
        img.src = basura.img;
        img.alt = basura.nombre;
        img.loading = "lazy";
        boton.appendChild(img);

        boton.addEventListener("click", function () {
            elegirBasura(indice, boton);
        });

        item.appendChild(boton);
        listaRegistro.appendChild(item);
    });

    function elegirBasura(indice, boton) {
        const basura = BASURAS[indice];
        $$(".basura-btn", listaRegistro).forEach(function (b) {
            b.setAttribute("aria-pressed", String(b === boton));
        });
        rf.img.src = basura.img;
        rf.img.classList.remove("cambia");
        void rf.img.offsetWidth;
        rf.img.classList.add("cambia");
        rf.nombre.textContent = basura.nombre;
        rf.contenedor.dataset.contenedor = basura.contenedor;
        rf.contenedor.textContent = "Contenedor: " + NOMBRES_CONTENEDOR[basura.contenedor];
        rf.material.textContent = basura.material;
        rf.degradacion.textContent = basura.degradacion;
        rf.consejo.textContent = basura.consejo;
        rf.efectos.replaceChildren.apply(rf.efectos, basura.efectos.map(function (texto) {
            const li = document.createElement("li");
            li.textContent = texto;
            return li;
        }));
        Sonido.efecto("basura");
    }

    filtros.forEach(function (filtro) {
        filtro.addEventListener("click", function () {
            const elegido = filtro.dataset.filtro;
            filtros.forEach(function (f) {
                f.setAttribute("aria-pressed", String(f === filtro));
            });
            $$(".registro__item", listaRegistro).forEach(function (item) {
                item.hidden = elegido !== "todos" && item.dataset.contenedor !== elegido;
            });
        });
    });


    // =====================================================
    // PREGUNTAS FRECUENTES
    // =====================================================

    const preguntas = $$(".faq-question");

    preguntas.forEach(function (pregunta) {
        pregunta.addEventListener("click", function () {
            const abierta = pregunta.getAttribute("aria-expanded") === "true";

            preguntas.forEach(function (otra) {
                otra.setAttribute("aria-expanded", "false");
                document.getElementById(otra.getAttribute("aria-controls")).hidden = true;
            });

            if (!abierta) {
                pregunta.setAttribute("aria-expanded", "true");
                document.getElementById(pregunta.getAttribute("aria-controls")).hidden = false;
            }
        });
    });


    // =====================================================
    // MANYPIG: SELECTOR DE ANIMACIONES
    // =====================================================

    const fichaManyPig = $("#manypig-ficha");
    const botonesAnimacion = $$(".animaciones .animaciones__btn");

    botonesAnimacion.forEach(function (boton) {
        boton.addEventListener("click", function () {
            fichaManyPig.dataset.anim = boton.dataset.anim;
            if (boton.dataset.anim === "jump") {
                Sonido.efecto("salto");
            }
            botonesAnimacion.forEach(function (otro) {
                otro.setAttribute("aria-pressed", String(otro === boton));
            });
        });
    });


    // =====================================================
    // GALERÍA: VISOR DE CAPTURAS
    // =====================================================

    const visor = $("#visor");
    const visorMarco = $("#visor-marco");
    const visorPie = $("#visor-pie");
    const visorContador = $("#visor-contador");
    const itemsGaleria = $$(".galeria__item");

    const visorImagen = document.createElement("img");
    visorImagen.className = "visor__imagen";
    visorMarco.appendChild(visorImagen);

    let indiceVisor = 0;

    function mostrarCaptura(indice) {
        indiceVisor = (indice + itemsGaleria.length) % itemsGaleria.length;

        const item = itemsGaleria[indiceVisor];
        const imagen = $("img", item);

        visorImagen.src = imagen.dataset.grande || imagen.currentSrc || imagen.src;
        visorImagen.alt = imagen.alt;
        visorImagen.width = 1280;
        visorImagen.height = 720;
        visorPie.textContent = $(".galeria__pie", item).textContent;
        visorContador.textContent = (indiceVisor + 1) + " / " + itemsGaleria.length;
    }

    itemsGaleria.forEach(function (item, indice) {
        $(".galeria__btn", item).addEventListener("click", function () {
            mostrarCaptura(indice);
            Sonido.efecto("abrir");

            if (typeof visor.showModal === "function") {
                visor.showModal();
            } else {
                window.open(visorImagen.src, "_blank");
            }
        });
    });

    $("#visor-anterior").addEventListener("click", function () { mostrarCaptura(indiceVisor - 1); });
    $("#visor-siguiente").addEventListener("click", function () { mostrarCaptura(indiceVisor + 1); });
    $("#visor-cerrar").addEventListener("click", function () { visor.close(); });

    visor.addEventListener("click", function (evento) {
        if (evento.target === visor) {
            visor.close();
        }
    });

    visor.addEventListener("keydown", function (evento) {
        if (evento.key === "ArrowLeft") {
            mostrarCaptura(indiceVisor - 1);
        } else if (evento.key === "ArrowRight") {
            mostrarCaptura(indiceVisor + 1);
        }
    });


    // =====================================================
    // TRÁILER DE YOUTUBE (se configura en js/config.js)
    // =====================================================

    function idDeYouTube(texto) {
        const valor = String(texto || "").trim();
        if (!valor) {
            return "";
        }
        if (/^[\w-]{11}$/.test(valor)) {
            return valor;
        }
        const coincidencia = valor.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
        return coincidencia ? coincidencia[1] : "";
    }

    const trailer = $("#trailer-marco");
    const pantallaTrailer = $("#trailer-pantalla");
    const avisoTrailer = $("#trailer-aviso");
    const playTrailer = $("#trailer-play");
    const pieTrailer = $("#trailer-pie");
    const idTrailer = idDeYouTube(CONFIG.trailerYouTube);

    if (idTrailer) {
        trailer.dataset.estado = "listo";
        avisoTrailer.hidden = true;
        playTrailer.hidden = false;
        pieTrailer.textContent = "Tráiler oficial de EcoAventura en YouTube.";

        playTrailer.addEventListener("click", function () {
            const marco = document.createElement("iframe");
            marco.src = "https://www.youtube-nocookie.com/embed/" + idTrailer + "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
            marco.title = "Tráiler de EcoAventura";
            marco.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            marco.allowFullscreen = true;
            marco.referrerPolicy = "strict-origin-when-cross-origin";
            pantallaTrailer.appendChild(marco);
            playTrailer.hidden = true;
            trailer.dataset.estado = "reproduciendo";
            // El sonido del tráiler manda: se apaga el ambiente de la página.
            if (Sonido.activo) {
                botonSonido.click();
            }
            marco.focus();
        });
    } else if (String(CONFIG.trailerYouTube || "").trim()) {
        // Hay texto pero no es un enlace válido: se avisa en la consola.
        console.warn("EcoAventura: el enlace del tráiler en js/config.js no parece un video de YouTube.");
    }


    // =====================================================
    // PRINCESA: el cristal reacciona al botón final
    // =====================================================

    const cristal = $("#cristal");
    const botonFinal = $(".final__cta");

    ["pointerenter", "focus"].forEach(function (evento) {
        botonFinal.addEventListener(evento, function () { cristal.classList.add("quiebra"); });
    });
    ["pointerleave", "blur"].forEach(function (evento) {
        botonFinal.addEventListener(evento, function () { cristal.classList.remove("quiebra"); });
    });


    // =====================================================
    // DESCARGA: el botón se activa cuando el juego ya está en la carpeta
    // (ver el comentario en index.html, sección "Descargar")
    // =====================================================

    const botonDescarga = $("#btn-descarga");
    const textoDescarga = $("#btn-descarga-texto");
    const estadoDescarga = $("#descarga-estado");

    if (botonDescarga.dataset.disponible !== "true") {
        botonDescarga.setAttribute("aria-disabled", "true");
        botonDescarga.removeAttribute("download");
        textoDescarga.textContent = "Próximamente";
        estadoDescarga.textContent = "La descarga para PC estará disponible pronto";

        // Los otros botones que llevan a la descarga tampoco prometen un archivo
        $$("[data-texto-descarga]").forEach(function (texto) {
            texto.textContent = "Próximamente";
        });

        botonDescarga.addEventListener("click", function (evento) {
            evento.preventDefault();
        });
    }
})();

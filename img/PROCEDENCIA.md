# Procedencia de las imágenes

Ninguna imagen de esta página fue inventada ni generada por IA.

## img/capturas/

Son capturas reales del juego. Se tomaron el 23 de octubre de 2026 con Godot 4.7 a partir del proyecto `eco-aven` (1280×720). Usan el renderizador de compatibilidad, y ManyPig se colocó en distintos puntos de cada nivel.

| Archivo | Escena | Posición X del jugador |
|---|---|---|
| nivel1-playa-basura.webp | scenes/Game.tscn | 300 |
| nivel1-playa-inicio.webp | scenes/Game.tscn | 1150 |
| nivel1-playa-islas.webp | scenes/Game.tscn | 2350 |
| nivel1-playa-plataformas.webp | scenes/Game.tscn | 3200 |
| nivel1-playa-final.webp | scenes/Game.tscn | 6400 |
| nivel2-bosque-arbol.webp | scenes/Level2.tscn | 300 |
| nivel2-bosque-plataformas.webp | scenes/Level2.tscn | 3000 |
| nivel3-nieve-inicio.webp | scenes/Level3.tscn | 1500 |
| nivel3-nieve-plataformas.webp | scenes/Level3.tscn | 3000 |
| menu-principal.webp | scenes/MainMenu.tscn | — |

## img/juego/

Son copias sin cambios de los sprites del proyecto de Godot. La excepción son los cuatro `basura_*.png`, que se recortaron y se redujeron a 192 px de alto.

- `character_berie_*`, `background_*`, `collectibles_coin_gold`, `vegetation_*`, `trap_spike`, `sandbug_walk`: pack *Berie's Adventure Seaside* de Crusenho (https://crusenho.itch.io/). La licencia exige dar crédito.
- `portal_sheet.png`: assets/portal del proyecto.
- `basura_plastico.png` (SODAPOP), `basura_carton.png` (CARTON), `basura_metal.png` (METAL), `basura_general.png` (BASURAGRANDE): arte del equipo EcoAventura (assets/trash).

## fonts/

Pixelify Sans y Lexend, de Google Fonts, con licencia SIL Open Font License 1.1.

## img/capturas/v2/ (octubre 2026)

Capturas reales del juego actual. Son fotogramas de los planos limpios que se grabaron con el Movie Maker de Godot 4.7 para el tráiler (`videos/EcoAventura_Trailer_Final/proyecto_edicion/public/clips/` y `menu/`), reducidos de 1920×1080 a 1280×720 y 640×360 (WebP). No se retocaron.

| Archivo | Plano de origen |
|---|---|
| playa-jefe | clips/pl_jefe.mp4 |
| playa-islas | clips/pl_accion.mp4 |
| playa-palmera | clips/pl_tirador.mp4 |
| playa-basura | clips/pl_sucia.mp4 |
| desierto-rey-cactus | clips/de_rey_cactus.mp4 |
| desierto-plataformas | clips/de_fragil.mp4 |
| desierto-rodadora | clips/de_rodadora.mp4 |
| jungla-bisonte | clips/ju_bisonte.mp4 |
| jungla-trampolin | clips/ju_trampolin.mp4 |
| jungla-planta | clips/ju_enemigos.mp4 |
| helado-tormenta | clips/hi_tormenta.mp4 |
| helado-carambanos | clips/hi_carambanos.mp4 |
| helado-enemigos | clips/hi_enemigos.mp4 |
| castillo-verdugo | clips/ca_combate.mp4 |
| castillo-espada | clips/ca_espada.mp4 |
| castillo-fase3 | clips/ca_fase3.mp4 |
| registro-basura | clips/registro.mp4 |
| tienda-ecologica | clips/tienda.mp4 |
| menu-principal | menu/menu_completo.mp4 |

## videos/clips/

Recortes de 3 a 4 s, sin audio, de los mismos planos (854×480, H.264). Se usan en los niveles y en las fichas de los jefes.

## img/zonas/, img/jefes/, img/basura/, img/juego/espada_legendaria.png, img/juego/character_berie_death.png

Copias de los recursos del proyecto `eco-aven`:

- `zonas/desierto/*` ← `assets/desierto/` (fondo del nivel 2).
- `zonas/jungla/*` ← `assets/jungla/fondo/` (fondo del nivel 3).
- `zonas/helado/*` ← `assets/final/cielo_noche.png`, `montana_1..6.png`, `niebla.png` (nivel 4).
- `zonas/castillo/*` ← `assets/final/castillo_salon.png`, `castillo_exterior.png`.
- `jefes/saqueador-*` ← filas 0 y 1 de `assets/nivel3/GandalfHardcore Archer red sheet.png` (recortadas).
- `jefes/rey-cactus.png` ← `assets/desierto/cactus_tirador.png`.
- `jefes/bisonte-*` ← filas 0 y 3 de `assets/jungla/bisonte_hacha.png` (recortadas).
- `jefes/guardian-*` ← `assets/final/personajes/Frozen_Warden/` (idle y attack1).
- `jefes/verdugo-*` ← `assets/final/personajes/Icebound_Knight/` (idle y attack2).
- `jefes/princesa-idle.png` ← `assets/final/personajes/Hollow_Queen/idle_strip7.png`.
- `basura/*` ← `assets/basura_biomas/`.

## audio/

Efectos y ambientes convertidos a MP3 desde los sonidos del juego (`assets/audio/`, copiados en `videos/EcoAventura_Trailer_Final/proyecto_edicion/audio/sfx_juego/`) y desde los efectos sintetizados del tráiler (`videos/EcoAventura_Trailer_Final/efectos_sonido/`). La tabla de qué archivo suena en cada acción está en `js/config.js`.

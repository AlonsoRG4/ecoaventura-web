# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Primary visitors: niñas y niños de 8 a 15 años (primaria y secundaria) who discover EcoAventura and want to see what the game looks like before downloading it for PC.
- Secondary visitors: docentes looking for a digital resource for environmental education in class, families who play with them, and the school jury that evaluates the project (the page is shown during the team's presentation).

## Product Purpose

Official website of **EcoAventura**, a 2D side-scrolling educational platformer made in Godot. The page presents the game, shows how it really looks (real captures, short gameplay clips and sprites), explains how to play, and leads to the PC download. By the owner's decision (Oct 2026) the page shows no credits of people, team or authors and has no credits section.

Success: a first-time visitor understands within one viewport that this is a pixel-art game about cleaning up an island, sees the real game and its trailer, and finds the download.

## Positioning

The game's hero is **ManyPig**, a pig that turns recycled trash into **EcoMonedas** to restore the **Isla Verde**. Playing *is* the lesson: picking up trash and sorting it by material (plástico, cartón, metal, general) is the core mechanic, tied to ODS 12 (consumo responsable) and ODS 4 (educación de calidad).

## Operating Context

- Built as a school project at UTTT; presented live to a jury with a demo.
- Game source: Godot 4.7 project `eco-aven` (GDScript, 1280×720 base resolution, Windows export preset).
- Web stack: static HTML + CSS + vanilla JS (`index.html`, `css/estilos.css`, `js/script.js`), served locally with Live Server on port 8080 and published from the GitHub repo `paginaecoaventura`.

## Capabilities and Constraints

- In the game today (Godot project, Oct 2026): main menu, settings, tutorial, saved progress (CONTINUAR), four levels plus the castle: Nivel 1 Playa sepultada (boss Saqueador de la costa), Nivel 2 Desierto (Rey Cactus), Nivel 3 Jungla (Bisonte Jefe), Nivel 4 Reino helado (Guardián del Filo, 3 braseros, espada legendaria) and the Castillo del Verdugo (Verdugo del Hielo, 3 phases; Princesa Aurora trapped in black ice). Each level requires all coins, all trash and its boss before the portal opens.
- 19 trash types with educational records (Registro de basura) and six HUD containers: plástico, cartón, metal, vidrio, peligroso, especial.
- Tienda Ecológica: Chaleco ecológico, Escudo reciclado, Recargar escudo, paid in EcoMonedas.
- Controls: A/D or arrows to move, Space to jump (double jump), J or X sword attack (once obtained), T shop, B dance, ESC menu.
- The downloadable build (`juego/EcoAventura.zip`) does not exist yet in the website folder.
- The official trailer exists as a video file; its YouTube link is set in `js/config.js` (`trailerYouTube`) once published.

## Brand Commitments

- Name: **ECO AVENTURA** (written as two words in the game's menu). Menu tagline: "PROTEGE LA NATURALEZA · RECICLA · AVENTÚRATE". Website line kept: "Un mundo mejor también se juega".
- The website must look like a natural extension of the game: palette and pixel art come from the game's real assets, never a generic template. No invented screenshots.
- Pixel art is shown with nearest-neighbour scaling, never blurred or distorted.
- Spanish (Mexico) is the only language.

## Evidence on Hand

- Real in-game captures rendered from the Godot project (levels 1–3 and main menu) in `img/capturas/`.
- Real sprites: ManyPig idle/run/jump/hit sheets, coins, trash items, palms, sand and sky layers, sand bug, spikes, portal (in `img/juego/`).
- Design document `DOCUMENTO_ECOAVENTURA.md` in the Godot project (story, character, zones, rules, audience).
- Real gameplay clips (videos/clips/) cut from the trailer's clean Godot recordings, and real captures in img/capturas/v2/.
- No team photos; no testimonials, ratings, download counts or press. Do not fabricate any of these.

## Product Principles

1. Show the real game first; words second.
2. Every recycling claim maps to something the player actually does in the game.
3. Kid-readable: short sentences, big targets, high contrast.
4. No credits of people or authors on the page (owner's decision). Note: some art licences (e.g. Crusenho's pack) ask for credit; the owner was informed and decides where to give it (e.g. the trailer description or the game's credits screen).

## Accessibility & Inclusion

Young readers: generous type size, strong contrast, keyboard access to every control, and `prefers-reduced-motion` respected.
